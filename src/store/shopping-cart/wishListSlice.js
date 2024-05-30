import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  const serializedState = localStorage.getItem("wishlistItems");
  return serializedState ? JSON.parse(serializedState) : [];
};

const saveWishlist = (items) => {
  const serializedState = JSON.stringify(items);
  localStorage.setItem("wishlistItems", serializedState);
};

const initialState = {
  items: loadWishlist(),
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push(newItem);
        saveWishlist(state.items);
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlist(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      saveWishlist(state.items);
    },
  },
});

export const wishListActions = wishListSlice.actions;
export default wishListSlice;
