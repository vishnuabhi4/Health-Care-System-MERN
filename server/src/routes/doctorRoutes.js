import express from "express";
import { createDoctor, getDoctors, getDoctorById, getDoctorByUserId } from "../controllers/doctorController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getAvailableSlots, getDoctorsBySpecialization } from "../controllers/doctorController.js";


const router = express.Router();
// Only admins can create a doctor
router.post("/:userId", authenticate, authorizeRoles("admin"), createDoctor);//for data creation of doctor

// Anyone (or authenticated users) can get doctors
router.get("/", authenticate,authorizeRoles("admin"), getDoctors);

// Get doctor by ID (could also restrict to admin or doctor themselves)
router.get("/:id", authenticate,authorizeRoles("admin"), getDoctorById);

// Get doctor by Specilization
router.get("/specialization/:spec", getDoctorsBySpecialization);

//fetch available slots for patients to book appoinment
router.get("/:id/available-slots", getAvailableSlots);

//fetch doctor data with user ID(if there is data?)
router.get("/data/:userId", authenticate, authorizeRoles("admin"),getDoctorByUserId);

 export default router;