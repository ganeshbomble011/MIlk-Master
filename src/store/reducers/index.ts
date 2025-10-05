/** @format */

import { combineReducers } from '@reduxjs/toolkit';
import { priceMasterApi } from '../../services/collector-service';

const apis = [priceMasterApi];

export const rootReducer = combineReducers(
  Object.fromEntries(apis.map((api) => [api.reducerPath, api.reducer]))
);
