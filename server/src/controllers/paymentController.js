import crypto from "crypto";
import razorpayInstance from "../../config/razorpay.js";
import dotenv from "dotenv";
dotenv.config();
import Appointment from "../models/appointmentModel.js";
import { log } from "console";
import Razorpay from "razorpay";



export const createOrder = async (req, res) => {
 
  try {
   const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
};

export const getKey = (req, res) => {
  try {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Razorpay key" });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  try {
   
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      doctorId,
      patientId,
      timeSlot,
      date,
      name,
      email,
      phone,
      service,
      notes
    } = req.body;

    // Validate required fields
    if (!doctorId || !patientId || !timeSlot || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required appointment fields",
      });
    }

    // Step 1: Verify Razorpay signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");




    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Step 2: Build appointment data properly
    const appointmentData = {
      doctorId,
      patientId,
      timeSlot,
      date,
      name,
      email,
      phone,
      service,
      notes,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    };

    // Step 3: Save appointment
    const appointment = await Appointment.create(appointmentData);

    return res.json({
      success: true,
      message: "Payment verified & appointment booked",
      appointment,
    });

  } catch (error) {
    console.error("Payment verify error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
