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

export const directionAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    directionsByCity: build.query<Direction[], string>({
      query: (codeName) => `partner/directions_by_city?code_name=${codeName}`,
      providesTags: ["DIRECTION"],
    }),
    editDirection: build.mutation<void, EditDirecitonRequest>({
      query: (BodyParams) => ({
        url: `/partner/edit_partner_directions`,
        method: `PATCH`,
        body: BodyParams,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    availableValutes: build.query<
      AvailableValutesDtoResponse,
      AvailableValutesDtoRequest
    >({
      query: ({ base = "all" }) => ({
        url: `partner/available_valutes?base=${base}`,
        method: "GET",
      }),
      // transformResponse: (response:AvailableValutesDtoResponse ) => response
    }),
    actualCourse: build.query<ActualCourseDtoResponse, ActualCourseDtoRequest>({
      query: ({ valute_from, valute_to }) => ({
        url: `/partner/actual_course?valute_from=${valute_from}&valute_to=${valute_to}`,
        method: "GET",
      }),
    }),
    addDirection: build.mutation<
      AddDirectionDtoResponse,
      AddDirectionDtoRequest
    >({
      query: (body) => ({
        url: `partner/add_partner_direction`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [DIRECTION, LOCATION],
    }),
    deleteDirection: build.mutation<void, { direction_id: number }>({
      query: (params) => ({
        url: "/partner/delete_partner_direction",
        method: "DELETE",
        params: params,
      }),
      invalidatesTags: [DIRECTION],
    }),
  }),
});
export const {
  useDirectionsByCityQuery,
  useEditDirectionMutation,
  useAvailableValutesQuery,
  useActualCourseQuery,
  useAddDirectionMutation,
  useDeleteDirectionMutation,
} = directionAPI;
