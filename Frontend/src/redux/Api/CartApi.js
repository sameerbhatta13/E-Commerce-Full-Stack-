import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { APP_URL } from "../../../config";

const token = localStorage.getItem('accessToken')
export const CartApi = createApi({
    reducerPath: 'cartapi',
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL,
    }),
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (body) => ({
                url: '/cart/add',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: body
            })
        }),
        getCartProduct: builder.query({
            query: () => ({
                url: `/cart`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
        }),
        increaseCart: builder.mutation({
            query: (productid) => ({
                url: `/cart/increase/${productid}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),

        decreaseCart: builder.mutation({
            query: (productid) => ({
                url: `/cart/decrease/${productid}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        removeOneCart: builder.mutation({
            query: (productid) => ({
                url: `/cart/remove/${productid}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        removewholeCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }


            })
        })
    })

})

export const { useAddToCartMutation, useGetCartProductQuery, useIncreaseCartMutation, useDecreaseCartMutation, useRemoveOneCartMutation, useRemovewholeCartMutation } = CartApi