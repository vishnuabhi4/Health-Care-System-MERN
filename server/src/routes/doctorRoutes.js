import express from "express";
import { createDoctor, getDoctors, getDoctorById } from "../controllers/doctorController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getAvailableSlots } from "../controllers/doctorController.js";

const router = express.Router();
// Only admins can create a doctor
router.post("/:userId", authenticate, authorizeRoles("admin"), createDoctor);//for data creation of doctor

// Anyone (or authenticated users) can get doctors
router.get("/", authenticate, getDoctors);

// Get doctor by ID (could also restrict to admin or doctor themselves)
router.get("/:id", authenticate, getDoctorById);

//fetch available slots for patients to book appoinment
router.get("/:id/available-slots", getAvailableSlots);

 export default router;