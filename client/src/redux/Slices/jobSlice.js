import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

export const CreateJob = createAsyncThunk(
  '/auth/createjob',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/job/createJob`,
        data
      );
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
        `${import.meta.env.VITE_API_URL}/job/getJobs?currentPage=${activePage}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const applyJob = createAsyncThunk(
  '/auth/applyJob',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/job/applyJob`,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getApplicants = createAsyncThunk(
  '/auth/getApplicants',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/job/${id}/applicants`
       
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getJobsByCreator = createAsyncThunk(
  '/auth/getJobsByCreator',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:3000/job/${id}/creator`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  jobs: [],
  jobsCreator: [],
  error: null,
  applicants: [],
  loading: false,
  toastId: null,
  totalPages: 0,
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
        state.totalPages = action.payload.data.totalPages;
        state.jobs = action.payload.data.job;

        // toast.success(action.payload.message);
      })
      .addCase(getJob.rejected, (state, action) => {
        (state.loading = false), console.log(action.payload);
      })
      .addCase(applyJob.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getJobsByCreator.pending, (state, action) => {
        (state.loading = false), console.log(action.payload);
      })
      .addCase(getJobsByCreator.fulfilled, (state, action) => {
        state.loading = false;
        state.jobsCreator = action.payload.data;
      })
      .addCase(getJobsByCreator.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getApplicants.pending, (state, action) => {
        state.loading = false
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.loading = false;
       
        state.applicants = action.payload.data.applicants;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default jobSlice.reducer;
