import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from '../../../config.js'
export const ProductAPi = createApi({
    reducerPath: "productapi",
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        getProduct: builder.query({
            query: () => ({
                url: '/productlist',
                method: "GET"
            })
        }),
        getOneProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET'
            })
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/postproduct",
                method: "POST",
                body: data
            })
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/updateproduct/${id}`,
                method: "PUT",
                body: data
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/deleteproduct/${id}`,
                method: 'delete',
            })


        })
    })
})


export const { useGetProductQuery, useGetOneProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = ProductAPi