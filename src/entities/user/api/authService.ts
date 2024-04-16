import { Tokens } from "../model/types";
import { authApi, baseApi } from "@/shared/api";
import { ProfileInfoDtoRequest, ProfileInfoDtoResponse } from "./types";

type AuthParams = {
  username: string;
  password: string;
};

type ChangePassword = {
  new_password: string;
};

export const authorizationAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Tokens, AuthParams>({
      query: (authParams) => {
        const formData = new FormData();
        formData.append("username", authParams.username);
        formData.append("password", authParams.password);

        return {
          url: `/auth/token`,
          method: `POST`,
          body: formData,
        };
      },
    }),
  }),
});
export const { useLoginMutation } = authorizationAPI;

export const changePasswordAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<string, ChangePassword>({
      query: (password) => ({
        url: `/partner/change_password`,
        method: "POST",
        body: password,
      }),
    }),
  }),
});
export const { useChangePasswordMutation } = changePasswordAPI;
export const profileInfoApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    profileInfo: build.query<ProfileInfoDtoResponse, ProfileInfoDtoRequest>({
      query: () => ({
        url: `/partner/account_info`,
        method: "GET",
      }),
    }),
  }),
});
export const { useProfileInfoQuery } = profileInfoApi;
