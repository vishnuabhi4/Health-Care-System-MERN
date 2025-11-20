import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const fetchMyAppointments = createAsyncThunk(
  "appointments/fetchMyAppointments",
  async () => {
    const res = await axiosInstance.get("/appointments/my");
    return res.data.data;
  }
);

export const cancelAppointment = createAsyncThunk(
  "appointments/cancelAppointment",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/appointments/${appointmentId}/cancel`);
      return res.data.data; // updated appointment
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Cancel failed");
    }
  }
);


const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch appointments";
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const updated = action.payload;

        state.data = state.data.map((appt) =>
          appt._id === updated._id ? updated : appt
        );
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.error = action.payload || "Failed to cancel appointment";
      });
  },
});

export default appointmentsSlice.reducer;
