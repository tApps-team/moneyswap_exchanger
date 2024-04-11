import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "./authBaseQuery";
import { DIRECTION, LOCATION } from "./tags";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: [DIRECTION, LOCATION],
});
