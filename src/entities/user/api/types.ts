import { TelegramAccountType } from "../model/types";

export type ProfileInfoDtoResponse = {
  title: {
    ru: string;
    en: string;
  };
  partner_link: string;
  telegram: TelegramAccountType | null;
  has_exchange_admin_order: boolean;
};
export type ProfileInfoDtoRequest = void;

export type AddTelegramAccountDtoRequest = {
  tg_id: number;
};
export type AddTelegramAccountDtoResponse = string;

export type EditTelegramAccountDtoRequest = {
  tg_id: number;
};
export type EditTelegramAccountDtoResponse = string;