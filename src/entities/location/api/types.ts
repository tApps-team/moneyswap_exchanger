import { City, Country } from "../model/types";

export type AllCountriesDtoResponse = Country[];
export type AllCountriesDtoRequest = void;

export type CitiesByCountryDtoNameResponse = City[];
export type CitiesByCountryDtoNameRequest = {
  country_name: string;
};
