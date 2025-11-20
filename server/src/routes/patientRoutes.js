import express from "express";
import { createPatientDetails } from "../controllers/patientController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js"; 

const router = express.Router();

// Admin or patient themselves can create details
router.post(
  "/create/:userId",
  authenticate,
  authorizeRoles("admin", "patient"),
  createPatientDetails
);
//POST http://localhost:5000/api/patient/id

// json {
//   "dob": "1998-05-12",
//   "gender": "male",
//   "bloodGroup": "O+",
//   "phone": "9876543210",
//   "address": "Chennai, India",
//   "emergencyContact": "9876543211"
// }
export default router;
