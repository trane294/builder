import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/store';
import { logout } from 'src/features/auth/authSlice';
import { useNavigate } from 'react-router';

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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    // Successful retrieval - user is authenticated
                    // Dispatch an action to update the auth state with user details (if needed)
                    // Example: dispatch(setUserDetails(result.data));  // You'll need to define this action.
                } catch ({ error }: any) {
                    // Handle authentication errors (e.g., 401 Unauthorized)
                    if (error.status === 401) {
                        // Token is invalid or expired.  Clear the token and redirect.
                        dispatch(logout()); // You need to define this action.
                    } else {
                        //Handle other errors
                        console.error('Error fetching user details:', error);
                        // Dispatch an action to indicate an error occurred.
                        // Example: dispatch(setAuthError(error.message)); // Define this action.
                    }
                }
            },
        }),
    }),
});

export const { useGetUserDetailsQuery } = authApi;
