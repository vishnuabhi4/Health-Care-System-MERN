import express from "express";
import { submitContactMessage } from "../controllers/contactController.js";

const router = express.Router();

// Public route
router.post("/contact", submitContactMessage);

export default router;
