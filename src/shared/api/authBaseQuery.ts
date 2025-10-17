import { Tokens, userSlice } from "@/entities/user";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import Cookies from "js-cookie";

interface TokenResponse {
  data?: Tokens;
}

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

const mutex = new Mutex();

const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let accessToken = Cookies.get("accessToken");
  const baseQuery = fetchBaseQuery({
    baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    prepareHeaders: (headers) => {
      headers.set('moneyswap', 'true');
      return headers;
    },
  });
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      console.log("accessError");
      try {
        const refreshToken = Cookies.get("refreshToken");
        const refreshResult = (await baseQuery(
          {
            method: "POST",
            url: "/api/v2/auth/refresh",
            body: { refresh_token: refreshToken },
          },
          api,
          extraOptions
        )) as TokenResponse;

        if (refreshResult.data) {
          const newAccessToken = refreshResult.data.access_token;
          const newRefreshToken = refreshResult.data.refresh_token;
          
          // Обновляем токены в cookies
          Cookies.set("accessToken", newAccessToken);
          Cookies.set("refreshToken", newRefreshToken);
          
          // Обновляем токены в Redux store
          api.dispatch(userSlice.actions.setTokens({
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
            token_type: refreshResult.data.token_type || 'bearer'
          }));
          
          // Обновляем локальную переменную токена
          accessToken = newAccessToken;
          
          // Создаем новый baseQuery с обновленным токеном
          const newBaseQuery = fetchBaseQuery({
            baseUrl,
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Moneyswap': 'true',
            },
            prepareHeaders: (headers) => {
              headers.set('moneyswap', 'true');
              return headers;
            },
          });
          
          // Повторяем оригинальный запрос с новым токеном
          result = await newBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(userSlice.actions.logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      // Перечитываем токен после разблокировки мьютекса
      const updatedAccessToken = Cookies.get("accessToken");
      const updatedBaseQuery = fetchBaseQuery({
        baseUrl,
        headers: {
          Authorization: `Bearer ${updatedAccessToken}`,
        },
        prepareHeaders: (headers) => {
          headers.set('moneyswap', 'true');
          return headers;
        },
      });
      result = await updatedBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default authBaseQuery;
