import { authApi } from "@/shared/api";
import {
  ActualCourseDtoRequest,
  ActualCourseDtoResponse,
  AddDirectionDtoRequest,
  AddDirectionDtoResponse,
  AvailableValutesDtoRequest,
  AvailableValutesDtoResponse,
  EditDirecitonRequest,
  GetBankomatsByValuteResponse,
  GetDirectionsByRequest,
  GetDirectionsByResponse,
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
        url: `/api/test/partner/available_valutes`,
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
    editDirection: build.mutation<void, EditDirecitonRequest>({
      query: (BodyParams) => ({
        url: `/api/partner/edit_partner_directions`,
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
  }),
});
export const {
  useAvailableValutesQuery,
  useGetBankomatsByValuteQuery,
  useActualCourseQuery,
  useDirectionsByQuery,
  useAddDirectionMutation,
  useEditDirectionMutation,
  useDeleteDirectionMutation,
} = directionAPI;
