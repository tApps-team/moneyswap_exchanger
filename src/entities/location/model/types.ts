export type City = {
  name: {
    ru: string;
    en: string;
  };
  code_name: string;
  id: number;
};
export type Country = {
  name: {
    ru: string;
    en: string;
  };
  id: number;
  country_flag: string;
};
export type ActiveCity = {
  id: number;
  name: {
    ru: string;
    en: string;
  };
  code_name: string;
  country: {
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
};
