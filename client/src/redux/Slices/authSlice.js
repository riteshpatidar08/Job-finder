import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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

export const LoginForm = createAsyncThunk(
  '/auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//first is action name => /auth/signup ;
const initialState = {
  loading: false,
  token: null,
  role: null,
  id: null,
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
      })
      .addCase(LoginForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(LoginForm.fulfilled, (state, action) => {
        state.loading = false;
        const token = action.payload.data.token;
        state.token = token;
        const { role, id, name } = jwtDecode(token);
        state.role = role;
        state.id = id;
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('role', role);
        console.log(action.payload.data.token);
      })
      .addCase(LoginForm.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
