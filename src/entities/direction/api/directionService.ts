import { Direction } from "../model/types";
import { authApi } from "@/shared/api";
import {
  ActualCourseDtoRequest,
  ActualCourseDtoResponse,
  AddDirectionDtoRequest,
  AddDirectionDtoResponse,
  AvailableValutesDtoRequest,
  AvailableValutesDtoResponse,
  EditDirecitonRequest,
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
        url: `/api/partner/available_valutes?base=${base}`,
        method: "GET",
      }),
      // transformResponse: (response:AvailableValutesDtoResponse ) => response
    }),
    actualCourse: build.query<ActualCourseDtoResponse, ActualCourseDtoRequest>({
      query: ({ valute_from, valute_to }) => ({
        url: `/api/partner/actual_course?valute_from=${valute_from}&valute_to=${valute_to}`,
        method: "GET",
      }),
    }),
    directionsBy: build.query<
      Direction[],
      { id: number; marker: LocationMarker }
    >({
      query: (params) => ({
        url: `/api/test/partner/directions_by`,
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
        url: `/api/test/partner/add_partner_direction`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    editDirection: build.mutation<void, EditDirecitonRequest>({
      query: (BodyParams) => ({
        url: `/api/test/partner/edit_partner_directions`,
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
        url: "/api/test/partner/delete_partner_direction",
        method: "DELETE",
        body,
      }),
      invalidatesTags: [DIRECTION],
    }),
  }),
});
export const {
  useAvailableValutesQuery,
  useActualCourseQuery,
  useDirectionsByQuery,
  useAddDirectionMutation,
  useEditDirectionMutation,
  useDeleteDirectionMutation,
} = directionAPI;
