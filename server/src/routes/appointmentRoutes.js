// routes/appointmentRoutes.js
import express from "express";
import {
  createAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  cancelAppointment,
} from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Patients create appointment
router.post("/", authenticate, createAppointment);

// Patients get their own appointments
router.get("/my", authenticate, getAppointmentsByPatient);

// Doctors (or admins) get appointments for a doctor
router.get("/doctor/:doctorId", authenticate, getAppointmentsByDoctor);

// Cancel appointment
router.put("/:id/cancel", authenticate, cancelAppointment);

export default router;
