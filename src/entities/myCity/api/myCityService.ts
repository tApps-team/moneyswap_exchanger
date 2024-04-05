import { MyCity } from "../model/types";
import { authApi } from "@/shared/api";

export const myCityAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<MyCity[], void>({
      query: () => `/partner/partner_cities`,
    }),
  }),
});
export const { useGetCitiesQuery } = myCityAPI;
