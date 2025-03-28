export type City = {
  id: number;
  name: {
    ru: string;
    en: string;
  };
  code_name: string;
};
export type Country = {
  id: number;
  name: {
    ru: string;
    en: string;
  };
  country_flag: string;
};
export type ActiveLocation = {
  id: number;
  name: {
    ru: string;
    en: string;
  };
  code_name?: string;
  country?: {
    ru: string;
    en: string;
  };
  country_flag: string;
  info: {
    delivery: boolean;
    office: boolean;
    working_days: Record<string, boolean>;
    weekdays: { time_from: string; time_to: string };
    weekends: { time_from: string; time_to: string };
  };
  updated: {
    date: string;
    time: string;
  };
  min_amount: number | null;
  max_amount: number | null;
};
