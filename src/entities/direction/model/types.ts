import { CurrencyType, Name } from "@/shared/types";

export type Direction = {
  id: number;
  valute_from: string;
  icon_valute_from: string;
  valute_to: string;
  icon_valute_to: string;
  is_active: boolean;
  out_count_type: string;
  in_count_type: string;
  bankomats: Bankomat[] | null;
  exchange_rates: ExchangeRate[] | null;
};

export type Currency = {
  id: string;
  name: Name;
  code_name: string;
  icon_url: string;
  type_valute: CurrencyType;
  is_popular: boolean;
};

export type CurrencyResponse = {
  id: string;
  name: Name;
  currencies: Currency[];
};

export type Bankomat = {
  id: number;
  available: boolean;
  name: string;
  icon: string;
};

export type ExchangeRate = {
  min_count: number | null;
  max_count: number | null;
  in_count: number;
  out_count: number;
  rate_coefficient: number;
  id?: number | null;
};
