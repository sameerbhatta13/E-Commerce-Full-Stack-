import { createSlice } from '@reduxjs/toolkit'
const data = localStorage.getItem('cartItems')
const data1 = data ? JSON.parse(data) : []


export const CART = createSlice({

    name: "CART",
    initialState: {
        cart: [...data1]

    }
    ,
    reducers: {
        addToCart: (state, action) => {
            console.log('current state', state.cart)
            console.log('current payload', action.payload)
            let data = state.cart.find((item) => item._id === action.payload?._id)
            if (data) {
                data.quantity += 1
            }
            else {

                state.cart.push({ ...action.payload, quantity: 1 })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },
        removeFromCart: (state, action) => {

            let data = state.cart.filter((item) => item._id != action.payload._id)
            state.cart = data
            localStorage.setItem('cartItems', JSON.stringify(data))

        },
        allRemoveCart: (state, action) => {
            state.cart = []
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },
        increaseQuanity: (state, action) => {
            let data = state.cart.find((item) => item._id === action.payload?._id)
            data.quantity += 1
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        },
        decreaseQuanity: (state, action) => {
            let data = state.cart.find((item) => item._id === action.payload?._id)
            if (data.quantity > 1) {
                data.quantity -= 1
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        }
    }

})

export const { addToCart, removeFromCart, allRemoveCart, decreaseQuanity, increaseQuanity } = CART.actions

export default CART.reducer