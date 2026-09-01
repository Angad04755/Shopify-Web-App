import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "../redux/slices/WishlistSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        cart: cartReducer,
        wishlist: wishlistReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;