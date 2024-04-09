import { CurrencyCategory } from "../model/types";

export type AvailableValutesDtoRequest = {
  base?: string;
};
export type AvailableValutesDtoResponse = CurrencyCategory;

export type ActualCourseDtoResponse = string;
export type ActualCourseDtoRequest = {
  valute_from: string;
  valute_to: string;
};
