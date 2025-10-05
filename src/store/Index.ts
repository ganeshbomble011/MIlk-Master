/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/reducers';
import { priceMasterApi } from '../services/collector-service';
import { gridConfigurationApi } from '../services/gridConfig-service';

const apis = [priceMasterApi, gridConfigurationApi];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.map((api: any) => api.middleware)),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
