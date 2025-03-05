import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from '../baseQueryWithAuth';
import { ICreateWebsite, ITemplate, IWebsite } from 'src/types';

export const websiteApi = createApi({
    reducerPath: 'websiteApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getWebsiteTemplates: builder.query<ITemplate[], void>({
            query: () => ({
                url: 'website/templates',
                method: 'GET',
            }),
        }),
        getWebsites: builder.query<IWebsite[], void>({
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
    useGetWebsiteTemplatesQuery,
} = websiteApi;
