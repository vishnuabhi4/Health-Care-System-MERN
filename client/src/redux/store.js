import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice.js";
import appointmentsReducer from "./features/appointmentsSlice";
import doctorReducer from "./features/doctorSlice.js"
import doctorAppointmentReducer from "./features/doctorAppointmentSlice.js"
import medicalReportsReducer from "./features/medicalReportSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
     appointments: appointmentsReducer,
     doctor: doctorReducer,
     doctorAppointments: doctorAppointmentReducer,
     medicalReports: medicalReportsReducer,
  },
   });
