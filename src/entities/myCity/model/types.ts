export type MyCity = {
  id: number;
  name: string;
  code_name: string;
  country: string;
  country_flag: string;
  info: {
    delivery: true;
    office: true;
    working_days: {
      ПН?: true;
      ВТ?: true;
      СР?: true;
      ЧТ?: true;
      ПТ?: true;
      СБ?: true;
      ВС?: true;
    };
    time_from: string;
    time_to: string;
  };
};
