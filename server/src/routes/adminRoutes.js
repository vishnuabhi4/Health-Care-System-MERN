import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createDoctorUserController } from "../controllers/adminUserController.js";
import { getDoctors } from "../controllers/doctorController.js";

const router = express.Router();



// Admin-only route to create doctor login credentials
router.post("/doctors", authenticate, authorizeRoles("admin"), createDoctorUserController);

router.get("/doctorslist",authenticate,authorizeRoles("admin"),getDoctors)

export default router;
