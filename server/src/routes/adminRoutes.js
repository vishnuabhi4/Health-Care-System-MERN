import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createDoctorUserController } from "../controllers/adminUserController.js";

const router = express.Router();

// Admin-only route to create doctor login credentials
router.post("/doctors", authenticate, authorizeRoles("admin"), createDoctorUserController);

export default router;
