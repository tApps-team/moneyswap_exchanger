import { authApi } from "@/shared/api";
import { ActiveCity } from "../model/types";

export const authLocationApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<ActiveCity[], void>({
      query: () => `/partner/partner_cities`,
    }),
  }),
});
export const { useGetCitiesQuery } = authLocationApi;
