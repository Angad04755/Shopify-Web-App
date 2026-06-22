import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, action) => {
      state.isAuthenticated = action.payload; 
    },
  },
});

export const { authenticated } = authSlice.actions;
export default authSlice.reducer;