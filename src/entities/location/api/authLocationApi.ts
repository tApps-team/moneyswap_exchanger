import { authApi } from "@/shared/api";
import { ActiveLocation } from "../model/types";
import {
  AddPartnerLocationDtoRequest,
  AddPartnerLocationDtoResponse,
  EditPartnerLocationDtoRequest,
  EditPartnerLocationDtoResponse,
  DeletePartnerLocationDtoRequest,
  DeletePartnerLocationDtoResponse,
  GetCitiesByCountryDtoRequest,
  GetCitiesByCountryDtoResponse,
  EditCitiesByCountryDtoRequest,
  EditCitiesByCountryDtoResponse,
} from "./types";
import { LOCATION } from "@/shared/api/tags";

export const authLocationApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<ActiveLocation[], void>({
      query: () => `/api/partner/partner_countries`,
      providesTags: [LOCATION],
    }),
    getCities: build.query<ActiveLocation[], void>({
      query: () => `/api/partner/partner_cities`,
      providesTags: [LOCATION],
    }),
    // города в стране
    getCitiesByCountry: build.query<
      GetCitiesByCountryDtoResponse,
      GetCitiesByCountryDtoRequest
    >({
      query: (params) => ({
        url: "/api/partner/cities_for_exclude_by_partner_country",
        method: "GET",
        params: params,
      }),
    }),
    getCitiesByCountryMutation: build.mutation<
      GetCitiesByCountryDtoResponse,
      GetCitiesByCountryDtoRequest
    >({
      query: (params) => ({
        url: "/api/partner/cities_for_exclude_by_partner_country",
        method: "GET",
        params: params,
      }),
    }),
    editCitiesByCountry: build.mutation<
      EditCitiesByCountryDtoResponse,
      EditCitiesByCountryDtoRequest
  >({
    query: (body) => ({
        url: "/api/partner/edit_excluded_cities_by_partner_country",
        method: "PATCH",
        body: body,
      }),
    }),

    // объединенные запросы
    addPartnerLocation: build.mutation<
      AddPartnerLocationDtoResponse,
      AddPartnerLocationDtoRequest
    >({
      query: (body) => ({
        url: "/api/partner/add_partner_city_country",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [LOCATION],
    }),
    editPartnerLocation: build.mutation<
      EditPartnerLocationDtoResponse,
      EditPartnerLocationDtoRequest
    >({
      query: (body) => ({
        url: "/api/partner/edit_partner_city_country",
        body: body,
        method: "PATCH",
      }),
      invalidatesTags: [LOCATION],
    }),
    deletePartnerLocation: build.mutation<
      DeletePartnerLocationDtoResponse,
      DeletePartnerLocationDtoRequest
    >({
      query: (body) => ({
        url: `/api/partner/delete_partner_city_country`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [LOCATION],
    }),
  }),
});
export const {
  useGetCountriesQuery,
  useGetCitiesQuery,

  // города в стране
  useGetCitiesByCountryQuery,
  useGetCitiesByCountryMutationMutation,
  useEditCitiesByCountryMutation,

  // объединенные запросы
  useAddPartnerLocationMutation,
  useEditPartnerLocationMutation,
  useDeletePartnerLocationMutation,
} = authLocationApi;
