import { baseApi } from "@/shared/api";
import {
  AllCountriesDtoRequest,
  AllCountriesDtoResponse,
  CitiesByCountryDtoNameRequest,
  CitiesByCountryDtoNameResponse,
  EditPartnerCityDtoRequest,
  EditPartnerCityDtoResponse,
} from "./types";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allCountries: build.query<AllCountriesDtoResponse, AllCountriesDtoRequest>({
      query: () => ({
        url: "partner/countries",
        method: "GET",
      }),
    }),
    citiesByCountryName: build.query<
      CitiesByCountryDtoNameResponse,
      CitiesByCountryDtoNameRequest
    >({
      query: ({ country_name }) => ({
        url: `partner/cities?country_name=${country_name}`,
        method: "GET",
      }),
    }),
    editPartnerCity: build.mutation<
      EditPartnerCityDtoResponse,
      EditPartnerCityDtoRequest
    >({
      query: (body) => ({
        url: "partner/edit_partner_city",
        body: body,
        method: "PATCH",
      }),
      invalidatesTags: ["LOCATION"],
    }),
  }),
});
export const {
  useAllCountriesQuery,
  useCitiesByCountryNameQuery,
  useEditPartnerCityMutation,
} = locationApi;
