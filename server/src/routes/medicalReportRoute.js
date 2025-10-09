import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../controllers/medicalReportController.js";
import { authenticate} from "../middlewares/authMiddleware.js";
import {authorizeRoles} from '../middlewares/roleMiddleware.js'

const router = express.Router();
// const debug = (req,res,next)=>{console.log(req.body);
//   next()}
// Create report (only doctor,admin can create)
router.post("/",authenticate, authorizeRoles("doctor","admin"), createReport);

// Get all reports (maybe restrict to admin or patient’s own reports)
router.get("/", authenticate, getReports);

// Get single report
router.get("/:id", authenticate, getReportById);

// Update report (doctor only)
router.put("/:id", authenticate, authorizeRoles("doctor"), updateReport);

// Delete report (admin or doctor)
router.delete("/:id", authenticate, authorizeRoles("doctor", "admin"), deleteReport);

export default router; 
