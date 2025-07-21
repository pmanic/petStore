// src/redux/petsListSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import staticValues from '../assets/staticValues';

/**
 * Redux slice for managing pet list state.
 */
export const petsListSlice = createSlice({
  name: "petsList",
  initialState: {
    petsListLoading: false,
    pets: [],
    petsListError: false
  },
  reducers: {
    setPetsListLoading: (state) => {
      state.petsListLoading = true;
      state.petsListError = false;
    },
    unsetPetsListLoading: (state) => {
      state.petsListLoading = false;
    },
    setPetsList: (state, action) => {
      state.pets = action.payload;
    },
    setPetsListError: (state) => {
      state.petsListLoading = false;
      state.petsListError = true;
    }
  }
});

/**
 * Retrieves a list of pets from the API and dispatches actions to update the state.
 */
export const getPetsList = () => async (dispatch) => {
  try {
    dispatch(setPetsListLoading());
    const response = await axios.get(`${staticValues.baseURL.dev}`);
    dispatch(setPetsList(response.data));
    dispatch(unsetPetsListLoading());
  } catch (err) {
    dispatch(setPetsListError());
  }
};

export const {
  setPetsListLoading,
  unsetPetsListLoading,
  setPetsList,
  setPetsListError
} = petsListSlice.actions;

/**
 * Selectors
 */
export const petsListLoadingState = (state) => state.petsList.petsListLoading;
export const petsState = (state) => state.petsList.pets;
export const petsListErrorState = (state) => state.petsList.petsListError;

export default petsListSlice.reducer;
