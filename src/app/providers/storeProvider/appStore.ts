import { userSlice } from "@/entities/user";
import { authAPI } from "@/entities/user/api/authService";
import { baseApi } from "@/shared/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, baseApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
