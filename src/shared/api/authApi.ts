import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "./authBaseQuery";
import { DIRECTION, LOCATION, TELEGRAM } from "./tags";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [DIRECTION, LOCATION, TELEGRAM],
});
