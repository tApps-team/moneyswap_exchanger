import { baseApi } from "@/shared/api";
import {
  AllCountriesDtoRequest,
  AllCountriesDtoResponse,
  CitiesByCountryDtoNameRequest,
  CitiesByCountryDtoNameResponse,
} from "./types";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allCountries: build.query<AllCountriesDtoResponse, AllCountriesDtoRequest>({
      query: () => ({
        url: "/api/partner/countries",
        method: "GET",
      }),
    }),
    citiesByCountryName: build.query<
      CitiesByCountryDtoNameResponse,
      CitiesByCountryDtoNameRequest
    >({
      query: ({ country_name }) => ({
        url: `/api/partner/cities?country_name=${country_name}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useAllCountriesQuery, useCitiesByCountryNameQuery } =
  locationApi;
