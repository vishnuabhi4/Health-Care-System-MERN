import express from "express";
import { createOrder, verifyPayment,getKey  } from "../controllers/paymentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();



router.post("/order", createOrder);
router.post("/verify", verifyPayment);
router.get("/key", getKey);


export default router;