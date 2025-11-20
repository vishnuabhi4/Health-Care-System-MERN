import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

//  Async thunk to fetch doctor info by ID
export const fetchDoctorInfo = createAsyncThunk(
  "doctor/fetchDoctorInfo",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/doctorinfo/${doctorId}`);
      return response.data; // assuming API returns { success: true, doctor: {...} }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch doctor info");
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctorInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Optional — for clearing state on logout, etc.
    clearDoctorInfo: (state) => {
      state.doctorInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorInfo = action.payload;
      })
      .addCase(fetchDoctorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorInfo } = doctorSlice.actions;
export default doctorSlice.reducer;
