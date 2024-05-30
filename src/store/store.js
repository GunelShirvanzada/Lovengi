import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import wishListSlice from "./shopping-cart/wishListSlice";
import userSlice from "./shopping-cart/userSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    wishlist: wishListSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
