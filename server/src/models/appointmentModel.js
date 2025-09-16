import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "confirmed", "cancelled", "completed"],
      default: "booked",
    },
    reasonForVisit: {
      type: String,
    },
    notes: {
      type: String,
    },
    prescriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
