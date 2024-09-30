// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Store/Feature/authslice'; // Import the auth slice

export const store = configureStore({
  reducer: {
    auth: authReducer, // Register the auth reducer in the store
  },
});

export default store;
