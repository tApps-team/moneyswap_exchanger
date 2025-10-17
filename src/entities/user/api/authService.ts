import { Tokens } from "../model/types";
import { authApi, baseApi } from "@/shared/api";
import {
  AddTelegramAccountDtoRequest,
  AddTelegramAccountDtoResponse,
  EditTelegramAccountDtoRequest,
  EditTelegramAccountDtoResponse,
  ProfileInfoDtoRequest,
  ProfileInfoDtoResponse,
} from "./types";
import { TELEGRAM } from "@/shared/api/tags";

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
          url: `/api/v2/auth/token`,
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
        url: `/api/v2/partner/change_password`,
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
        url: `/api/v2/partner/account_info`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: [TELEGRAM],
    }),
    switchNotificationActivity: build.mutation<string, void>({
      query: () => ({
        url: `/api/v2/partner/switch_notification_activity`,
        method: "GET",
      }),
      invalidatesTags: [TELEGRAM],
    }),
    addTelegramAccount: build.mutation<
      AddTelegramAccountDtoResponse,
      AddTelegramAccountDtoRequest
    >({
      query: (params) => ({
        url: `/api/v2/partner/add_admin_exchange_order`,
        method: "POST",
        params,
      }),
      invalidatesTags: [TELEGRAM],
    }),
    editTelegramAccount: build.mutation<
     EditTelegramAccountDtoResponse,
     EditTelegramAccountDtoRequest
  >({
      query: (params) => ({
        url: `/api/v2/partner/edit_admin_exchange_order`,
        method: "POST",
        params,
      }),
      invalidatesTags: [TELEGRAM],
    }),
    deleteTelegramAccount: build.mutation<
     string,
     void
 >({
     query: () => ({
       url: `/api/v2/partner/delete_admin_exchange_order`,
       method: "DELETE",
     }),
     invalidatesTags: [TELEGRAM],
   }),
  }),
});
export const { useProfileInfoQuery, useSwitchNotificationActivityMutation, useAddTelegramAccountMutation, useEditTelegramAccountMutation, useDeleteTelegramAccountMutation } = profileInfoApi;
