import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";
import cartReducer from "./slices/cartSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
        cart: cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;