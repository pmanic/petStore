import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem('cartItems')) || []
  },
  reducers: {
    addToCart: (state, action) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (!existingItem) {
            const reservedPet = { ...action.payload, status: 'reserved' };
            state.items.push(reservedPet);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartItemsState = (state) => state.cart.items;

export default cartSlice.reducer;
