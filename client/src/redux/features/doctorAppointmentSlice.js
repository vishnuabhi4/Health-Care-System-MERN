// src/redux/features/doctorAppointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const fetchDoctorAppointments = createAsyncThunk(
  "doctorAppointments/fetchDoctorAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId || user?._id; //  support both shapes
      console.log("Report:", userId);

      if (!userId) throw new Error("User not logged in");

      const response = await axiosInstance.get(
        `/appointments/doctor/${userId}`
      );

      

      return response.data?.data || []; // handle wrapped data
    } catch (error) {
      console.error("Fetch appointments error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const doctorAppointmentSlice = createSlice({
  name: "doctorAppointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorAppointmentSlice.reducer;
