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
  time_from: string;
  time_to: string;
  working_days: Record<string, boolean>;
}>;

export type AddPartnerCityDtoResponse = void;
export type AddPartnerCityDtoRequest = {
  city: string;
  delivery: boolean;
  office: boolean;
  time_from: string;
  time_to: string;
  working_days: Record<string, boolean>;
};

export type DeletePartnerCityDtoResponse = void;
export type DeletePartnerCityDtoRequest = { id: number };
