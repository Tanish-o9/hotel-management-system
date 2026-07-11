import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const stored: number[] = JSON.parse(localStorage.getItem("wishlist") ?? "[]");

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: stored } as { ids: number[] },
  reducers: {
    toggleWishlist(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((i) => i !== id);
      } else {
        state.ids.push(id);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.ids));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
