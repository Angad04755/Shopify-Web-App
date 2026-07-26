import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import registerSlice from "./slices/registerSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        register: registerSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;