import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const SignupForm = createAsyncThunk(
  '/auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/auth/register',
        data,
        {
          headers: {
            'Content-Type': 'multipart-form/data',
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//first is action name => /auth/signup ;
const initialState = {
  loading: false,
};
//return promise => pending , rejected and fulfilled inside the slice
//the function which going to be used to call api

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignupForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(SignupForm.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(SignupForm.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
