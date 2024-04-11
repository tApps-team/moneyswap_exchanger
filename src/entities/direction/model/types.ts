export type Direction = {
  id: number;
  valute_from: string;
  icon_valute_from: string;
  valute_to: string;
  icon_valute_to: string;
  in_count: number;
  out_count: number;
  is_active: boolean;
};
export type Currency = {
  id: number;
  name: string;
  code_name: string;
  icon_url: string;
};
export type CurrencyCategory = {
  [key: string]: Currency[];
};
