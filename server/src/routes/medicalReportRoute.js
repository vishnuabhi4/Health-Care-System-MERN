import express from "express";
import {
  createReport,
  getReports,
  updateReport,
  deleteReport,
  getReportByPatientAndAppointment,
  getReportByPatientId
} from "../controllers/medicalReportController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// http://localhost:5000/api/medicalreport/

// Create report for a specific patientId
router.post(
  "/:patientId",
  authenticate,
  authorizeRoles("doctor", "admin"),
  createReport
);//report will contain the user id(user who post's the medical data) as the doctor id

//for patient (all reports bounded to the medical report with a userID(prescription))
router.get("/patient/:patientId", getReportByPatientId)

// Get all reports
router.get("/", authenticate, getReports);

// Get one report
router.get("/patient/:patientId/appointment/:appointmentId", authenticate, getReportByPatientAndAppointment);

// Update report (doctor only)
router.put("/:id", authenticate, authorizeRoles("doctor"), updateReport);

// Delete report (doctor/admin)
router.delete("/:id", authenticate, authorizeRoles("doctor", "admin"), deleteReport);

export default router;
