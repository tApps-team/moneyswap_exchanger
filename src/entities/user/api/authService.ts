import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tokens } from "../model/types";

type AuthParams = {
  username: string;
  password: string;
};

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/auth",
  }),
  endpoints: (build) => ({
    login: build.mutation<Tokens, AuthParams>({
      query: (authParams) => {
        const formData = new FormData();
        formData.append("username", authParams.username);
        formData.append("password", authParams.password);

        return {
          url: `/token`,
          method: `POST`,
          body: formData,
        };
      },
    }),
    logout: build.mutation<void, string>({
      query: (refreshToken) => ({
        url: `/logout`,
        method: `POST`,
        body: {
          refresh_token: refreshToken,
        },
      }),
    }),
  }),
});
