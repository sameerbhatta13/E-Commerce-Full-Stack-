import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../../config";

export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: '/category',
                method: "GET"
            })
        }),

    })
})

export const { useGetCategoryQuery } = CategoryApi