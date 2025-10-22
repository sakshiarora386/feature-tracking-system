import { configureStore } from '@reduxjs/toolkit';
import { featureRequestApi } from '../services/featureRequestApi';

export const store = configureStore({
  reducer: {
    [featureRequestApi.reducerPath]: featureRequestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(featureRequestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;