import { authApi } from "@/shared/api";
import { ActiveCity } from "../model/types";
import {
  AddPartnerCityDtoRequest,
  AddPartnerCityDtoResponse,
  DeletePartnerCityDtoRequest,
  DeletePartnerCityDtoResponse,
  EditPartnerCityDtoRequest,
  EditPartnerCityDtoResponse,
} from "./types";
import { LOCATION } from "@/shared/api/tags";

export const authLocationApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<ActiveCity[], void>({
      query: () => `/partner/partner_cities`,
      providesTags: [LOCATION],
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
      invalidatesTags: [LOCATION],
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
      invalidatesTags: [LOCATION],
    }),
    deletePartnerCity: build.mutation<
      DeletePartnerCityDtoResponse,
      DeletePartnerCityDtoRequest
    >({
      query: ({ id }) => ({
        url: `partner/delete_partner_city?city_id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [LOCATION],
    }),
  }),
});
export const {
  useGetCitiesQuery,
  useAddPartnerCityMutation,
  useEditPartnerCityMutation,
  useDeletePartnerCityMutation,
} = authLocationApi;
