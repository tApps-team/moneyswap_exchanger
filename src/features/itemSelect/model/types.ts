import { CurrencyType } from "@/shared/types";

export type BaseItem = {
  id: string | number;
  name?: {
    ru: string;
    en: string;
  };
  code_name?: string;
  icon_url?: string;
  type_valute?: CurrencyType;
  is_popular?: boolean;
  country_flag?: string;
}; 