import { createApi } from "@reduxjs/toolkit/query/react";
import { Direction } from "../model/directionType";
import authBaseQuery from "@/shared/api/authBaseQuery";

export const directionAPI = createApi({
  reducerPath: "directionAPI",
  baseQuery: authBaseQuery,
  endpoints: (build) => ({
    directionsByCity: build.query<Direction[], string>({
      query: (codeName) => `partner/directions_by_city?code_name=${codeName}`,
    }),
  }),
});
