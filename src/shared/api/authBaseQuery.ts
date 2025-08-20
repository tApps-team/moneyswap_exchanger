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
  const accessToken = Cookies.get("accessToken");
  const baseQuery = fetchBaseQuery({
    baseUrl,
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
            url: "/api/auth/refresh",
            body: { refresh_token: refreshToken },
          },
          api,
          extraOptions
        )) as TokenResponse;

        if (refreshResult.data) {
          const newAccessToken = refreshResult.data.access_token;
          Cookies.set("accessToken", newAccessToken);
          const newRefreshToken = refreshResult.data.refresh_token;
          Cookies.set("refreshToken", newRefreshToken);
          const newBaseQuery = fetchBaseQuery({
            baseUrl,
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
          result = await newBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(userSlice.actions.logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default authBaseQuery;
