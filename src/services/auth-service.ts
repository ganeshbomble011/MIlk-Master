/** @format */

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../src/utils/baseQuery'; // You'll need to define this or use fetchBaseQuery
import { LARGEST_COUNT_FOR_API } from '../../src/constants/ConstantNumbers';

// Define the login API
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // 🟢 Login Mutation
    userLogin: builder.mutation({
      query: (payload) => ({
        url: 'user/login', // Matches your original axios endpoint
        method: 'POST',
        body: payload,
      }),
    }),

    // 🔍 Optional: Get user list (if needed)
    getUsers: builder.query({
      query: (payload) =>
        `UserMaster?rowFirst=${payload.rowFirst ?? 0}&rowLast=${
          payload.rowLast ?? LARGEST_COUNT_FOR_API
        }`,
      providesTags: ['User'],
    }),

    // 🆕 Optional: Create user
    createUser: builder.mutation({
      query: (payload) => ({
        url: 'UserMaster',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (payload) => ({
        url: `UserMaster/${payload.userID}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: (payload) => ({
        url: 'UserMaster/DeleteUsers',
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),

    // 🔐 Optional: Get page access by userId
    getPageAccess: builder.query({
      query: (userId) =>
        `grid-configuration/AccessiblePageList?userId=${userId}`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyGetPageAccessQuery,
} = loginApi;
