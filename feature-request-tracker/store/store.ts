import { configureStore } from "@reduxjs/toolkit";
import { featureRequestApiApi } from "../services/featureRequestApi";

export const store = configureStore({
  reducer: {
    [featureRequestApiApi.reducerPath]: featureRequestApiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featureRequestApiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
