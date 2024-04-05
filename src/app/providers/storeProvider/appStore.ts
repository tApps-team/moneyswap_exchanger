import { directionAPI } from "@/entities/direction";
import { myCityAPI, myCitySlice } from "@/entities/myCity";
import { authAPI, userSlice } from "@/entities/user";
import { baseApi } from "@/shared/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [myCitySlice.name]: myCitySlice.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [myCityAPI.reducerPath]: myCityAPI.reducer,
  [directionAPI.reducerPath]: directionAPI.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        myCityAPI.middleware,
        directionAPI.middleware,
        baseApi.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
