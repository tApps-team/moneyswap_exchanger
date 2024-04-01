import { userSlice } from "@/entities/user";
import { authAPI } from "@/entities/user/api/authService";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { testAPI } from "@/widgets/myCustomAuthReq/api/testService";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [testAPI.reducerPath]: testAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authAPI.middleware, testAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
