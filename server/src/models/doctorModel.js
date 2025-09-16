import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // years
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: [
      {
        day: String, // e.g., "Monday"
        timeSlots: [String], // ["10:00-11:00", "2:00-3:00"]
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
