import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import registerSlice from "./slices/registerSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        register: registerSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;