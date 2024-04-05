import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "@/shared/api/authBaseQuery";
import { MyCity } from "../model/types";

export const myCityAPI = createApi({
  reducerPath: "myCityAPI",
  baseQuery: authBaseQuery,
  endpoints: (build) => ({
    getCities: build.query<MyCity[], string>({
      query: () => `/partner/partner_cities`,
    }),
  }),
});
