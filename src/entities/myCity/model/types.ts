export type MyCity = {
  id: number;
  name: string;
  code_name: string;
  country: string;
  country_flag: string;
  info: {
    delivery: boolean;
    office: boolean;
    working_days: {
      ПН: boolean;
      ВТ: boolean;
      СР: boolean;
      ЧТ: boolean;
      ПТ: boolean;
      СБ: boolean;
      ВС: boolean;
    };
    time_from: string;
    time_to: string;
  };
};
