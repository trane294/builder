// src/api/baseQueryWithAuth.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/store';
import { logout } from 'src/features/auth/authSlice';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.userToken;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

export const baseQueryWithAuth = async (
    args: any,
    api: any,
    extraOptions: any
) => {
    const result = await baseQuery(args, api, extraOptions);

    // Check for 401 Unauthorized error
    if (result.error && result.error.status === 401) {
        // Token is invalid or expired, dispatch logout
        api.dispatch(logout());
    }

    return result;
};