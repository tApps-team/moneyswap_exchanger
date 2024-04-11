import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "./authBaseQuery";

export const authApi = createApi({
  baseQuery: authBaseQuery,
  reducerPath: "authApi",
  endpoints: () => ({}),
  tagTypes: ["City", "Directions"],
});
