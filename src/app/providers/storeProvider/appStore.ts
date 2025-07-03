import { locationSlice } from "@/entities/location";
import { userSlice } from "@/entities/user";
import { authApi, baseApi } from "@/shared/api";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [locationSlice.name, userSlice.name],
};

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = () => {
  const store = configureStore({
    reducer: persistReducer(
      persistConfig,
      rootReducer
    ) as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware, authApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};
export const appStore = setupStore();
export const persistedStore = persistStore(appStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof appStore.dispatch;
