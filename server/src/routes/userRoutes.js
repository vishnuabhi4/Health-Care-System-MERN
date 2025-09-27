import express from "express";
import { getUsers } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Only admins can see all users
router.get("/userlist", authenticate, authorizeRoles("admin"), getUsers);
//authenticate fuction will add an extra key (user) that contains the role info.

export default router;
