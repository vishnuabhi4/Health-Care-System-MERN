// routes/appointmentRoutes.js
import express from "express";
import {
  createAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByPatient,
  cancelAppointment,
  getAllAppointments
} from "../controllers/appointmentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();



// Patients create appointment
router.post("/", authenticate, createAppointment);

// Get all appointments
router.get("/", authenticate,authorizeRoles('admin'), getAllAppointments);

// Patients get their own appointments
router.get("/my", authenticate, getAppointmentsByPatient);

// fetch doctor appointments
router.get("/doctor/:doctorId", authenticate, getAppointmentsByDoctor);

// Cancel appointment
router.put("/:id/cancel", authenticate, cancelAppointment);

export default router;
