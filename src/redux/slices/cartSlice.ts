import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/CartItem";
interface CartitemType {
    items: CartItem[],
}

const initialState: CartitemType = {
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const existingItem = state.items.find((item) => item.product.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
            state.items = [...state.items, { product: action.payload, quantity: 1 }]
            }
        },
        ClearCart: (state) => {
            state.items = []
        },
        DelteFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.product.id !== action.payload)
        },
        IncreaseQuanity: (state, action) => {
                const desiredItem = state.items.find((item) => item.product.id === action.payload);

                if (desiredItem) {
                    desiredItem.quantity += 1;
                }
        },
        DecreaseQuantity: (state, action) => {
            const desredItem = state.items.find((item) => item.product.id === action.payload);

            if (desredItem) {
                desredItem.quantity -= 1;
                if (desredItem.quantity === 0) {
                    state.items = state.items.filter((item) => item.product.id !== action.payload);
                }
            }

        }

        
    }
})

export const { AddToCart, DelteFromCart, IncreaseQuanity, DecreaseQuantity, ClearCart } = cartSlice.actions;
export default cartSlice.reducer; 