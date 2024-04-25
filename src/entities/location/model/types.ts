export type City = {
  name: string;
  code_name: string;
  id: number;
};
export type Country = {
  name: string;
  id: number;
  country_flag: string;
};
export type ActiveCity = {
  id: number;
  name: string;
  code_name: string;
  country: string;
  country_flag: string;
  info: {
    delivery: boolean;
    office: boolean;
    working_days: Record<string, boolean>;
    time_from: string;
    time_to: string;
  };
  updated: {
    date: string;
    time: string;
  };
};
