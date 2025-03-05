import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';
import { ICreateWebsite, IWebsite } from 'src/types';

export const websiteApi = createApi({
    reducerPath: 'websiteApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getWebsites: builder.query<any, void>({
            query: () => ({
                url: 'website',
                method: 'GET',
            }),
        }),
        getWebsiteById: builder.query<IWebsite, string>({
            query: (id) => ({
                url: `website/${id}`,
                method: 'GET',
            }),
        }),
        createWebsite: builder.mutation<any, ICreateWebsite>({
            query: (body) => ({
                url: 'website',
                method: 'POST',
                body: body,
            }),
        }),
        updateWebsite: builder.mutation<IWebsite, IWebsite>({
            query: (body: IWebsite) => ({
                url: `website/${body.id}`,
                method: 'PUT',
                body: body,
            }),
        }),
    }),
});

export const {
    useGetWebsitesQuery,
    useCreateWebsiteMutation,
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} = websiteApi;
