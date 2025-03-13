import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';

export const subscriptionApi = createApi({
    reducerPath: 'subscriptionApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Subscription'],
    endpoints: (builder) => ({
        upgradeSubscription: builder.mutation<
            { paymentUrl?: string; success?: boolean },
            { planId: string; userId?: string }
        >({
            query: (body) => ({
                url: 'subscription/upgrade',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Subscription'],
        }),

        getSubscriptionDetails: builder.query<
            {
                currentPlan: string;
                expiresAt: string | null;
                permissions: {
                    canCreate: boolean;
                    canPublish: boolean;
                    publishLimit: number;
                };
            },
            void
        >({
            query: () => ({
                url: 'subscription/details',
                method: 'GET',
            }),
            providesTags: ['Subscription'],
        }),
    }),
});

export const {
    useUpgradeSubscriptionMutation,
    useGetSubscriptionDetailsQuery,
} = subscriptionApi;