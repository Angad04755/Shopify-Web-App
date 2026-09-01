import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/Products";

interface Item {
    items: Product[],
}

const initialState: Item = {
    items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
}
const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        AddtoWishlist: (state, action) => {
            state.items = [...state.items, action.payload];
        },

        DeleteFromWishlist: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        }
    }
})

export const { AddtoWishlist, DeleteFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;