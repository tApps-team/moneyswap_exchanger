import { Direction } from "../model/types";
import { authApi } from "@/shared/api";
import {
  ActualCourseDtoRequest,
  ActualCourseDtoResponse,
  AvailableValutesDtoRequest,
  AvailableValutesDtoResponse,
} from "./directionDto";

export const directionAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    directionsByCity: build.query<Direction[], string>({
      query: (codeName) => `partner/directions_by_city?code_name=${codeName}`,
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
  }),
});
export const {
  useDirectionsByCityQuery,
  useAvailableValutesQuery,
  useActualCourseQuery,
} = directionAPI;
