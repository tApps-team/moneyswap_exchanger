import { LocationMarker } from "@/shared/types";
import { City, Country } from "../model/types";

export type AllCountriesDtoResponse = Country[];
export type AllCountriesDtoRequest = void;

export type CitiesByCountryDtoNameResponse = City[];
export type CitiesByCountryDtoNameRequest = {
  country_name: string;
};

// города в стране
export type GetCitiesByCountryDtoResponse = {
  country_id: number;
  active_pks: City[];
  unactive_pks: City[];
};
export type GetCitiesByCountryDtoRequest = {
  country_id: number;
};

export type EditCitiesByCountryDtoResponse = void;
export type EditCitiesByCountryDtoRequest = {
  country_id: number;
  active_pks: number[];
  unactive_pks: number[];
};

// объединенные запросы
export type AddPartnerLocationDtoResponse = {
  location_id: number;
};
export type AddPartnerLocationDtoRequest = Partial<{
  id: number;
  marker: LocationMarker;
  delivery: boolean;
  office: boolean;
  weekdays: { time_from: string; time_to: string };
  weekends: { time_from: string; time_to: string };
  working_days: Record<string, boolean>;
  min_amount: number | null;
  max_amount: number | null;
}>;

export type EditPartnerLocationDtoResponse = void;
export type EditPartnerLocationDtoRequest = Partial<{
  id: number;
  marker: LocationMarker;
  delivery: boolean;
  office: boolean;
  weekdays: { time_from: string; time_to: string };
  weekends: { time_from: string; time_to: string };
  working_days: Record<string, boolean>;
  min_amount: number | null;
  max_amount: number | null;
}>;

export type DeletePartnerLocationDtoResponse = void;
export type DeletePartnerLocationDtoRequest = {
  id: number;
  marker: LocationMarker;
};
