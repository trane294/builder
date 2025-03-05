import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getUserDetails: builder.query<any, void>({
            query: () => ({
                url: 'user/profile',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetUserDetailsQuery } = authApi;