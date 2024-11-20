import { LocationMarker } from "@/shared/types";
import { City, Country } from "../model/types";

export type AllCountriesDtoResponse = Country[];
export type AllCountriesDtoRequest = void;

export type CitiesByCountryDtoNameResponse = City[];
export type CitiesByCountryDtoNameRequest = {
  country_name: string;
};

// объединенные запросы
export type AddPartnerLocationDtoResponse = void;
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
