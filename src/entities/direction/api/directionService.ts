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
      query: ({ base = "all" }) => ({
        url: `/api/partner/available_valutes`,
        params: { base },
        method: "GET",
      }),
    }),
    getBankomatsByValute: build.query<
      GetBankomatsByValuteResponse,
      { valute: string }
    >({
      query: (params) => ({
        url: `/api/partner/bankomats_by_valute`,
        method: "GET",
        params,
      }),
    }),
    actualCourse: build.query<ActualCourseDtoResponse, ActualCourseDtoRequest>({
      query: ({ valute_from, valute_to }) => ({
        url: `/api/partner/actual_course?valute_from=${valute_from}&valute_to=${valute_to}`,
        method: "GET",
      }),
    }),
    directionsBy: build.query<GetDirectionsByResponse, GetDirectionsByRequest>({
      query: (params) => ({
        url: `/api/partner/directions_by`,
        method: `GET`,
        params,
      }),
      providesTags: [DIRECTION],
    }),
    directionsByNoncash: build.query<GetDirectionsByNoncashResponse, GetDirectionsByNoncashRequest>({
      query: () => ({
        url: `/api/partner/directions_by_noncash`,
        method: `GET`,
      }),
      providesTags: [DIRECTION],
    }),
    addDirection: build.mutation<
      AddDirectionDtoResponse,
      AddDirectionDtoRequest
    >({
      query: (body) => ({
        url: `/api/partner/add_partner_direction`,
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
      url: `/api/partner/add_partner_direction_noncash`,
      method: "POST",
      body: body,
    }),
    invalidatesTags: [DIRECTION, LOCATION],
  }),
    editDirection: build.mutation<EditDirectionResponse, EditDirectionRequest>({
      query: (BodyParams) => ({
        url: `/api/partner/edit_partner_directions`,
        method: `PATCH`,
        body: BodyParams,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    editNoncashDirection: build.mutation<EditNoncashDirectionResponse, EditNoncashDirectionRequest>({
      query: (BodyParams) => ({
        url: `/api/partner/edit_partner_directions_noncash`,
        method: `PATCH`,
        body: BodyParams,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    deleteDirection: build.mutation<
      void,
      {
        id: number;
        marker: LocationMarker;
        direction_id: number;
      }
    >({
      query: (body) => ({
        url: "/api/partner/delete_partner_direction",
        method: "DELETE",
        body,
      }),
      invalidatesTags: [DIRECTION],
    }),
    deleteNoncashDirection: build.mutation<
    void,
    {
      direction_id: number;
    }
  >({
    query: (body) => ({
      url: "/api/partner/delete_partner_direction_noncash",
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
  useDeleteNoncashDirectionMutation,
} = directionAPI;
