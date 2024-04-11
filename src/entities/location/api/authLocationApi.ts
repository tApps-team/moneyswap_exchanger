import { authApi } from "@/shared/api";
import { ActiveCity } from "../model/types";
import { AddPartnerCityDtoRequest, AddPartnerCityDtoResponse } from "./types";

export const authLocationApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<ActiveCity[], void>({
      query: () => `/partner/partner_cities`,
      // providesTags: (result) =>
      // //["LOCATION"],
    }),
    addPartnerCity: build.mutation<
      AddPartnerCityDtoResponse,
      AddPartnerCityDtoRequest
    >({
      query: (body) => ({
        url: "partner/add_partner_city",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["LOCATION"],
    }),
  }),
});
export const { useGetCitiesQuery, useAddPartnerCityMutation } = authLocationApi;
