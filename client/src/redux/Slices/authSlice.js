import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  '/auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/register', data);
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
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
      });
  },
});



export default authSlice.reducer;
