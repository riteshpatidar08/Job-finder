import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

export const CreateJob = createAsyncThunk(
  '/auth/createjob',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:3000/job/createJob', data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getJob = createAsyncThunk(
  '/auth/getjob',
  async (activePage, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/job/getJobs?currentPage=${activePage}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  jobs: [],
  error: null,
  loading: false,
  toastId: null,
  totalPages : 0
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateJob.pending, (state) => {
        state.loading = true;
        const toastId = toast.loading('creating job.....');
        state.toastId = toastId;
      })
      .addCase(CreateJob.fulfilled, (state, action) => {
        (state.loading = false), console.log(action.payload);
        toast.dismiss(state.toastId);
        toast.success(action.payload.message);
      })
      .addCase(CreateJob.rejected, (state, action) => {
        (state.loading = false), console.log(action.payload);
      })
      .addCase(getJob.pending, (state) => {
        state.loading = true;
      
      })
      .addCase(getJob.fulfilled, (state, action) => {
        (state.loading = false), console.log(action.payload);
        toast.dismiss(state.toastId);
        state.totalPages = action.payload.data.totalPages ;
        state.jobs = action.payload.data.job

        // toast.success(action.payload.message);
      })
      .addCase(getJob.rejected, (state, action) => {
        (state.loading = false), console.log(action.payload);
      });
  },
});

export default jobSlice.reducer;
