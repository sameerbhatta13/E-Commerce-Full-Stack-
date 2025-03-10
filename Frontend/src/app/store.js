import { configureStore } from "@reduxjs/toolkit";
import CART from "../redux/Slice/CartRedux";
import modeSlice from "../redux/Slice/ModeRedux"
import { ProductAPi } from "../redux/Api/ProductApi";
import { setupListeners } from '@reduxjs/toolkit/query'
import { CategoryApi } from "../redux/Api/CategoryApi";
import { SubCategoryApi } from "../redux/Api/SubcategoryApi";
import { UserApi } from "../redux/Api/UserApi";
import { CartApi } from "../redux/Api/CartApi";
import AuthSlice from "../redux/Slice/AuthSlice";
import { OrderApi } from "../redux/Api/OrderApi";

export const store = configureStore({
    reducer: {
        cart: CART,
        mode: modeSlice,
        auth: AuthSlice,
        [ProductAPi.reducerPath]: ProductAPi.reducer,
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [SubCategoryApi.reducerPath]: SubCategoryApi.reducer,
        [UserApi.reducerPath]: UserApi.reducer,
        [CartApi.reducerPath]: CartApi.reducer,
        [OrderApi.reducerPath]: OrderApi.reducer



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProductAPi.middleware, CategoryApi.middleware, SubCategoryApi.middleware, UserApi.middleware, CartApi.middleware, OrderApi.middleware
        ),
})
setupListeners(store.dispatch)