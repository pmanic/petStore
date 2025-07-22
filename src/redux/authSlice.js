// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Try to get user from localStorage on initial load
const storedUser = localStorage.getItem('petstoreUser');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('petstoreUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('petstoreUser');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const isLoggedInSelector = (state) => !!state.auth.user;

export default authSlice.reducer;
