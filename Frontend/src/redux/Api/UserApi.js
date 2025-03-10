import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_URL } from '../../../config.js'

const token = localStorage.getItem('accessToken')
export const UserApi = createApi({
    reducerPath: "userapi",
    baseQuery: fetchBaseQuery({
        baseUrl: APP_URL
    }),
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: "POST",
                body: data
            })
        }),
        signIn: builder.mutation({
            query: (data) => ({
                url: "/signin",
                method: "POST",
                body: data
            })
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/verify',
                method: 'POST',
                body: data
            })

        }),
        refreshToken: builder.mutation({
            query: (data) => ({
                url: `/refresh`,
                method: "POST",
                body: data
            })
        }),
        getOneUser: builder.query({
            query: () => ({
                url: '/mydata',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })

    })
})


export const { useAddUserMutation, useSignInMutation, useVerifyOtpMutation, useRefreshTokenMutation, useGetOneUserQuery } = UserApi