import { LocationMarker } from "@/shared/types";
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
  id: number;
  marker: LocationMarker;
  valute_from: string;
  valute_to: string;
};
export type EditDirecitonRequest = {
  id: number;
  marker: LocationMarker;
  directions: {
    id: number;
    in_count: number;
    out_count: number;
    is_active: boolean;
  }[];
};
