import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DIRECTION, LOCATION } from "./tags";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('moneyswap', 'true');
      return headers;
    },
  }),
  reducerPath: "api",
  endpoints: () => ({}),
  tagTypes: [DIRECTION, LOCATION],
});
