import { CurrencyType } from "@/shared/types";

export type Direction = {
  id: number;
  valute_from: string;
  icon_valute_from: string;
  valute_to: string;
  icon_valute_to: string;
  in_count: number;
  out_count: number;
  is_active: boolean;
  out_count_type: string;
  in_count_type: string;
};
export type Currency = {
  id: number;
  name: {
    ru: string;
    en: string;
  };
  code_name: string;
  icon_url: string;
  type_valute: CurrencyType;
};
export type CurrencyCategory = {
  [key: string]: Currency[];
};
