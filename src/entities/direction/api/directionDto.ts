import { CurrencyCategory } from "../model/types";

export type AvailableValutesDtoRequest = {
  base?: string;
};
export type AvailableValutesDtoResponse = CurrencyCategory;

export type ActualCourseDtoResponse = {
  valute_from: string;
  icon_valute_from: string;
  in_count: string;
  valute_to: string;
  icon_valute_to: string;
  out_count: string;
};
export type ActualCourseDtoRequest = {
  valute_from: string;
  valute_to: string;
};
