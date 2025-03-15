import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { APP_URL } from "../../../config";
const token = localStorage.getItem('accessToken')
export const OrderApi = createApi({
    reducerPath: 'orderapi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: (data) => ({
                url: '/order',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`
                },

            })
        }),
        getUserOrder: builder.query({
            query: () => ({
                url: '/order',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
        }),
        getAllOrderForAdmin: builder.query({
            query: () => ({
                url: '/allorder',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })

    })
})

export const { usePostOrderMutation, useGetUserOrderQuery, useGetAllOrderForAdminQuery, } = OrderApi