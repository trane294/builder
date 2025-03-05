import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/store';
import { logout } from 'src/features/auth/authSlice';

// Custom baseQuery with middleware logic
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:3000/api/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.userToken;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

// Middleware wrapper for baseQuery
const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
    const result = await baseQuery(args, api, extraOptions);

    // Check for 401 Unauthorized error
    if (result.error && result.error.status === 401) {
        // Token is invalid or expired, dispatch logout
        api.dispatch(logout());
        // Optionally, redirect to login page (you'll need to handle navigation outside of this middleware)
        // For example, you could dispatch an action to trigger navigation in a Redux listener.
    }

    return result;
};

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