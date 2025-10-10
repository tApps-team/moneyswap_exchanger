import { authApi } from "@/shared/api";
import {
  ActualCourseDtoRequest,
  ActualCourseDtoResponse,
  AddDirectionDtoRequest,
  AddDirectionDtoResponse,
  AvailableValutesDtoRequest,
  AvailableValutesDtoResponse,
  EditDirectionRequest,
  EditDirectionResponse,
  GetBankomatsByValuteResponse,
  GetDirectionsByRequest,
  GetDirectionsByNoncashRequest,
  GetDirectionsByResponse,
  GetDirectionsByNoncashResponse,
  AddNoncashDirectionDtoRequest,
  AddNoncashDirectionDtoResponse,
  EditNoncashDirectionResponse,
  EditNoncashDirectionRequest
} from "./directionDto";
import { DIRECTION, LOCATION } from "@/shared/api/tags";
import { LocationMarker } from "@/shared/types";

export const directionAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    availableValutes: build.query<
      AvailableValutesDtoResponse,
      AvailableValutesDtoRequest
    >({
      query: ({ base = "all", is_no_cash }) => ({
        url: `/api/v2/partner/available_valutes`,
        params: { base, is_no_cash },
        method: "GET",
      }),
    }),
    getBankomatsByValute: build.query<
      GetBankomatsByValuteResponse,
      { valute_id: number }
    >({
      query: (params) => ({
        url: `/api/v2/partner/bankomats_by_valute`,
        method: "GET",
        params,
      }),
    }),
    actualCourse: build.query<ActualCourseDtoResponse, ActualCourseDtoRequest>({
      query: (params) => ({
        url: `/api/v2/partner/actual_course`,
        method: "GET",
        params,
      }),
    }),
    directionsBy: build.query<GetDirectionsByResponse, GetDirectionsByRequest>({
      query: (params) => ({
        url: `/api/v2/partner/directions_by`,
        method: `GET`,
        params,
      }),
      providesTags: [DIRECTION],
    }),
    directionsByNoncash: build.query<GetDirectionsByNoncashResponse, GetDirectionsByNoncashRequest>({
      query: () => ({
        url: `/api/v2/partner/no_cash_directions`,
        method: `GET`,
      }),
      providesTags: [DIRECTION],
    }),
    addDirection: build.mutation<
      AddDirectionDtoResponse,
      AddDirectionDtoRequest
    >({
      query: (body) => ({
        url: `/api/v2/partner/add_partner_direction`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    addNoncashDirection: build.mutation<
    AddNoncashDirectionDtoResponse,
    AddNoncashDirectionDtoRequest
  >({
    query: (body) => ({
      url: `/api/v2/partner/add_partner_no_cash_direction`,
      method: "POST",
      body: body,
    }),
    invalidatesTags: [DIRECTION, LOCATION],
  }),
    editDirection: build.mutation<EditDirectionResponse, EditDirectionRequest>({
      query: (BodyParams) => ({
        url: `/api/v2/partner/edit_partner_directions`,
        method: `PATCH`,
        body: BodyParams,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    editNoncashDirection: build.mutation<EditNoncashDirectionResponse, EditNoncashDirectionRequest>({
      query: (BodyParams) => ({
        url: `/api/v2/partner/edit_partner_no_cash_directions`,
        method: `PATCH`,
        body: BodyParams,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    deleteDirection: build.mutation<
      void,
      {
        id?: number;
        marker: LocationMarker;
        direction_id: number;
      }
    >({
      query: (body) => ({
        url: "/api/v2/partner/delete_partner_direction",
        method: "DELETE",
        body,
      }),
      invalidatesTags: [DIRECTION],
    }),
  }),
});
export const {
  useAvailableValutesQuery,
  useGetBankomatsByValuteQuery,
  useActualCourseQuery,
  useDirectionsByQuery,
  useDirectionsByNoncashQuery,
  useAddDirectionMutation,
  useAddNoncashDirectionMutation,
  useEditDirectionMutation,
  useEditNoncashDirectionMutation,
  useDeleteDirectionMutation,
} = directionAPI;
