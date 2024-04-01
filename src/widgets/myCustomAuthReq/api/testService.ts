import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "@/shared/api/authBaseQuery";

type TestResponse = {
  pk: number;
  user: string;
  exchange: string;
};

export const testAPI = createApi({
  reducerPath: "testAPI",
  baseQuery: authBaseQuery,
  endpoints: (build) => ({
    testGet: build.query<TestResponse, string>({
      query: () => `/auth/test_jwt`,
    }),
  }),
});
