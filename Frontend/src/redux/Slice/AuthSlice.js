import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    },
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
        },

        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
})

export const { setCredentials, logout } = AuthSlice.actions
export default AuthSlice.reducer