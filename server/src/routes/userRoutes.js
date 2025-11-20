import express from "express";
import { getUsers,currentUser,updateUserProfile,getUserById } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";


const router = express.Router();

// Only admins can see all users
router.get("/userlist", authenticate, authorizeRoles("admin", "doctor"), getUsers);
//authenticate fuction will add an extra key (user) that contains the role info.

router.get("/currentuser", authenticate,currentUser )

router.put("/updateprofile", authenticate, updateUserProfile);//update user profile

router.get("/:id",authenticate,authorizeRoles("admin"),getUserById)

export default router;
 