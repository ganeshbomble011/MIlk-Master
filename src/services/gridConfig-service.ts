/** @format */

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../utils/baseQuery';

export const gridConfigurationApi = createApi({
  reducerPath: 'gridConfigurationApi',
  baseQuery: baseQuery,
  tagTypes: ['gridConfiguration'],
  endpoints: (builder) => ({
    getGridConfiguration: builder.query({
      query: (payload) => {
        const userData = JSON.parse(
          sessionStorage.getItem('userDetails') || '{}'
        );
        return `grid-configuration/GetGridData?gridName=${payload}&userId=${userData?.userID}`;
      },
      providesTags: ['gridConfiguration'],
    }),
    updateGridConfiguration: builder.mutation({
      query: (payload) => ({
        url: `grid-configuration/update-is-visible`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['gridConfiguration'],
    }),
  }),
});

export const {
  useGetGridConfigurationQuery,
  useLazyGetGridConfigurationQuery,
  useUpdateGridConfigurationMutation,
} = gridConfigurationApi;
