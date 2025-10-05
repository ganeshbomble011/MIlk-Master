/** @format */
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
// import { useUserLoginMutation } from '@store/services/gridConfigServices/login-services';
import { toast } from 'react-toastify';

export const baseQueryWithReauth = fetchBaseQuery({
  baseUrl: 'http://maheshjagzap-001-site1.qtempurl.com/api/',
  prepareHeaders: (headers: any) => {
    let count = 0;
    const validUser = JSON.parse(
      sessionStorage.getItem('userDetails') || 'null'
    );

    if (validUser && validUser?.userID !== undefined && count === 0) {
      headers.set('UserId', validUser.userID);
      headers.set('UserRoleId', validUser.roleID);
      count = count + 1;
    }

    return headers;
  },
});
let refreshPromise: Promise<void> | null = null;

export const baseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQueryWithReauth(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    if (status === 500) {
      toast.error('Something went wrong while processing your request');
      return result;
    }

    if (status === 400) {
      return result;
    }
    const validUser = JSON.parse(
      sessionStorage.getItem('userDetails') || 'null'
    );
  }

  return result;
};
