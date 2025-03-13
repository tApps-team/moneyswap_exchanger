import { LocationMarker } from "@/shared/types";
import {
  Bankomat,
  CurrencyResponse,
  Direction,
  ExchangeRate,
} from "../model/types";

export type AvailableValutesDtoRequest = {
  base?: string;
};
export type AvailableValutesDtoResponse = CurrencyResponse[];

export type GetBankomatsByValuteResponse = Bankomat[];

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

export type GetDirectionsByRequest = {
  id: number;
  marker: LocationMarker;
};
export type GetDirectionsByResponse = Direction[];

export type AddDirectionDtoResponse = void;
export type AddDirectionDtoRequest = {
  id: number;
  marker: LocationMarker;
  valute_from: string;
  valute_to: string;
  is_active: boolean;
  bankomats:
    | {
        id: number;
        available: boolean;
      }[]
    | null;
  exchange_rates: ExchangeRate[];
};

export type EditDirectionRequest = {
  id: number;
  marker: LocationMarker;
  directions: {
    id: number;
    is_active: boolean;
    exchange_rates: ExchangeRate[] | null;
  }[];
};
export type EditDirectionResponse = void;
