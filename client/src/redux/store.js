import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import jobReducer from './Slices/jobSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    job : jobReducer 
  },
});

export default store;
