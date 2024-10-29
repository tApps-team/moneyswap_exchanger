import { City, Country } from "../model/types";

export type AllCountriesDtoResponse = Country[];
export type AllCountriesDtoRequest = void;

export type CitiesByCountryDtoNameResponse = City[];
export type CitiesByCountryDtoNameRequest = {
  country_name: string;
};

export type EditPartnerCityDtoResponse = void;
export type EditPartnerCityDtoRequest = Partial<{
  city: string;
  delivery: boolean;
  office: boolean;
  weekdays: { time_from: string; time_to: string };
  weekends: { time_from: string; time_to: string };
  working_days: Record<string, boolean>;
  min_amount: number | null;
  max_amount: number | null;
}>;

export type AddPartnerCityDtoResponse = void;
export type AddPartnerCityDtoRequest = {
  city: string;
  delivery: boolean;
  office: boolean;
  weekdays: { time_from: string; time_to: string };
  weekends: { time_from: string; time_to: string };
  working_days: Record<string, boolean>;
  min_amount: number | null;
  max_amount: number | null;
};

export type DeletePartnerCityDtoResponse = void;
export type DeletePartnerCityDtoRequest = { id: number };
