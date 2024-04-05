import { Direction } from "../model/directionType";
import { authApi } from "@/shared/api";

export const directionAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    directionsByCity: build.query<Direction[], string>({
      query: (codeName) => `partner/directions_by_city?code_name=${codeName}`,
    }),
  }),
});
export const { useDirectionsByCityQuery } = directionAPI;
