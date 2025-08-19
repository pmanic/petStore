import { configureStore } from '@reduxjs/toolkit';
import petsListReducer from './petsListSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    petsList: petsListReducer,
    cart: cartReducer,
    auth: authReducer
  }
});
