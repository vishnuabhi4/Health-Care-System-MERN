import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

// CREATE REPORT
export const createMedicalReport = createAsyncThunk(
  "reports/create",
  async ({ patientId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/medicalreport/${patientId}`,
        payload
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// GET ALL REPORTS
export const fetchAllReports = createAsyncThunk(
  "reports/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
 
      const res = await axiosInstance.get("/medicalreport");
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// GET REPORTS BY PATIENT
export const fetchReportByPatient = createAsyncThunk(
  "reports/fetchByPatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/medicalreport/patient/${patientId}`);
      // res.data is already the report object
      
      return res.data;
    } catch (err) {
      console.error("API Error in fetchReportByPatient:", err.response?.data);
      return rejectWithValue(err.response?.data);
    }
  }
);




// GET REPORT BY PATIENT + APPOINTMENT
export const fetchReportByPatientAndAppointment = createAsyncThunk(
  "reports/fetchByPatientAndAppointment",
  async ({ patientId, appointmentId }, { rejectWithValue }) => {
    try {
      // Match your working backend route exactly
      const res = await axiosInstance.get(
        `/medicalreport/patient/${patientId}/appointment/${appointmentId}`
      );
      return res.data?.data; // your API returns { success, data, ... }
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);


const medicalReportSlice = createSlice({
  name: "medicalReports",
  initialState: {
    report: null,      // single report (e.g., selected)
    reports: [],       // all reports
    loading: false,
    error: null,
  },
  reducers: { clearReport: (state) => {
    state.report = null;
    state.error = null;
    state.loading = false;
  }},
  extraReducers: (builder) => {
    builder
      // CREATE REPORT
      .addCase(createMedicalReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedicalReport.fulfilled, (state, action) => {
        
        state.loading = false;
        state.report = action.payload;
        if (action.payload?.data) state.reports.push(action.payload.data);
      })
      .addCase(createMedicalReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // FETCH ALL REPORTS
      .addCase(fetchAllReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch reports";
      })

      // FETCH REPORTS BY PATIENT
      .addCase(fetchReportByPatient.pending, (state) => {
      console.log("Loading report...");
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchReportByPatient.fulfilled, (state, action) => {
      console.log("Fetched single report:", action.payload);
      state.loading = false;
      state.report = action.payload.data; // SINGLE OBJECT
    })
    .addCase(fetchReportByPatient.rejected, (state, action) => {
      console.log("Failed:", action.payload);
      state.loading = false;
      state.error = action.payload?.message ?? "Error";
    })

      // FETCH REPORT BY PATIENT + APPOINTMENT
      .addCase(fetchReportByPatientAndAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportByPatientAndAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload; // single report
      })
      .addCase(fetchReportByPatientAndAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch report";
      });
  },
});

export default medicalReportSlice.reducer;
