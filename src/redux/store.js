// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import petsListReducer from "./petsListSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    petsList: petsListReducer,
    cart: cartReducer
  }
});
