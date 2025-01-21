import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from 'src/store';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:3000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.userToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
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