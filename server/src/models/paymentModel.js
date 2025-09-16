import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: 0,
    },
    method: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Insurance", "Online"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    transactionId: {
      type: String, // useful for online/UPI/card payments
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
