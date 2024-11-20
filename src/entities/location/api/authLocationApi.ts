import { authApi } from "@/shared/api";
import { ActiveLocation } from "../model/types";
import {
  AddPartnerCityDtoRequest,
  AddPartnerCityDtoResponse,
  AddPartnerCountryDtoRequest,
  AddPartnerCountryDtoResponse,
  DeletePartnerCityDtoRequest,
  DeletePartnerCityDtoResponse,
  DeletePartnerCountryDtoRequest,
  DeletePartnerCountryDtoResponse,
  EditPartnerCityDtoRequest,
  EditPartnerCityDtoResponse,
  EditPartnerCountryDtoRequest,
  EditPartnerCountryDtoResponse,
} from "./types";
import { LOCATION } from "@/shared/api/tags";

export const authLocationApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.query<ActiveLocation[], void>({
      query: () => `/api/test/partner/partner_countries`,
      providesTags: [LOCATION],
    }),
    getCities: build.query<ActiveLocation[], void>({
      query: () => `/api/partner/partner_cities`,
      providesTags: [LOCATION],
    }),
    addPartnerCity: build.mutation<
      AddPartnerCityDtoResponse,
      AddPartnerCityDtoRequest
    >({
      query: (body) => ({
        url: "/api/partner/add_partner_city",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [LOCATION],
    }),
    addPartnerCountry: build.mutation<
      AddPartnerCountryDtoResponse,
      AddPartnerCountryDtoRequest
    >({
      query: (body) => ({
        url: "/api/test/partner/add_partner_country",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [LOCATION],
    }),
    editPartnerCity: build.mutation<
      EditPartnerCityDtoResponse,
      EditPartnerCityDtoRequest
    >({
      query: (body) => ({
        url: "/api/partner/edit_partner_city",
        body: body,
        method: "PATCH",
      }),
      invalidatesTags: [LOCATION],
    }),
    editPartnerCountry: build.mutation<
      EditPartnerCountryDtoResponse,
      EditPartnerCountryDtoRequest
    >({
      query: (body) => ({
        url: "/api/test/partner/edit_partner_country",
        body: body,
        method: "POST",
      }),
      invalidatesTags: [LOCATION],
    }),
    deletePartnerCity: build.mutation<
      DeletePartnerCityDtoResponse,
      DeletePartnerCityDtoRequest
    >({
      query: ({ city_id }) => ({
        url: `/api/partner/delete_partner_city`,
        method: "DELETE",
        params: { city_id },
      }),
      invalidatesTags: [LOCATION],
    }),
    deletePartnerCountry: build.mutation<
      DeletePartnerCountryDtoResponse,
      DeletePartnerCountryDtoRequest
    >({
      query: ({ country_id }) => ({
        url: `/api/test/partner/delete_partner_country`,
        method: "DELETE",
        body: { country_id },
      }),
      invalidatesTags: [LOCATION],
    }),
  }),
});
export const {
  useGetCountriesQuery,
  useGetCitiesQuery,
  useAddPartnerCityMutation,
  useAddPartnerCountryMutation,
  useEditPartnerCityMutation,
  useEditPartnerCountryMutation,
  useDeletePartnerCityMutation,
  useDeletePartnerCountryMutation,
} = authLocationApi;
