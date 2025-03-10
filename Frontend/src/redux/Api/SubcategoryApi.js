import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from "../../../config";

export const SubCategoryApi = createApi({
    reducerPath: 'SubCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        getSubCategory: builder.query({
            query: () => ({
                url: '/subcategory',
                method: "GET"
            })
        }),
        getSubCategoryBySearch: builder.query({
            query: (id) => ({
                url: `/subcategory?category=${id}`,
                method: "GET"
            })
        }),


    })
})

export const { useGetCategoryQuery, useGetSubCategoryBySearchQuery } = SubCategoryApi