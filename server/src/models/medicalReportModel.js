import mongoose from "mongoose";

const medicalReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    diagnosis: {
      type: String,
      required: true,
    },

    medications: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    // Optional fields
    surgery: {
      type: String,
      default: "",
    },

    allergy: {
      type: String,
      default: "",
    },
     appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MedicalReport", medicalReportSchema);
