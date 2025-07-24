export interface Tokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
export type TelegramAccountType = {
  id: number;
  name: string;
  link: string;
  notification: boolean;
}