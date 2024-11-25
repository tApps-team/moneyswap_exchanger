import { authApi } from "@/shared/api";
import { ActiveLocation } from "../model/types";
import {
  AddPartnerLocationDtoRequest,
  AddPartnerLocationDtoResponse,
  EditPartnerLocationDtoRequest,
  EditPartnerLocationDtoResponse,
  DeletePartnerLocationDtoRequest,
  DeletePartnerLocationDtoResponse,
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

  // объединенные запросы
  useAddPartnerLocationMutation,
  useEditPartnerLocationMutation,
  useDeletePartnerLocationMutation,
} = authLocationApi;
