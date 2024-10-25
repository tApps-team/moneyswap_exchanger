import { CurrencyCategory } from "../model/types";

export type AvailableValutesDtoRequest = {
  base?: string;
};
export type AvailableValutesDtoResponse = CurrencyCategory;

export type ActualCourseDtoResponse = {
  valute_from: string;
  icon_valute_from: string;
  in_count: number;
  valute_to: string;
  icon_valute_to: string;
  out_count: number;
};
export type ActualCourseDtoRequest = {
  valute_from: string;
  valute_to: string;
};

export type AddDirectionDtoResponse = void;
export type AddDirectionDtoRequest = {
  in_count: number;
  out_count: number;
  is_active: boolean;
  city: string;
  valute_from: string;
  valute_to: string;
  min_amount: number;
  max_amount: number;
};
export type EditDirecitonRequest = {
  city: string;
  directions: {
    id: number;
    in_count: number;
    out_count: number;
    is_active: boolean;
  }[];
};
