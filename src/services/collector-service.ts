/** @format */

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../utils/baseQuery';
import { LARGEST_COUNT_FOR_API } from '../constants/ConstantNumbers';

export const priceMasterApi = createApi({
  reducerPath: 'priceMasterApi',
  baseQuery: baseQuery,
  tagTypes: ['price'],
  endpoints: (builder: any) => ({
    getPrice: builder.query({
      query: (payload: any) =>
        `PriceMaster?rowFirst=${payload.rowFirst ?? 0}&rowLast=${
          payload.rowLast ?? LARGEST_COUNT_FOR_API
        }`,
      providesTags: ['price'],
    }),
    createPrice: builder.mutation({
      query: (payload: any) => ({
        url: 'PriceMaster',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['price'],
    }),
    updatePrice: builder.mutation({
      query: (payload: any) => ({
        url: `PriceMaster?PriceID=${payload.priceID}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['price'],
    }),
    deletePrice: builder.mutation({
      query: (payload: any) => ({
        url: `PriceMaster`,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['price'],
    }),
  }),
});

export const {
  useGetPriceQuery,
  useCreatePriceMutation,
  useUpdatePriceMutation,
  useDeletePriceMutation,
} = priceMasterApi;
