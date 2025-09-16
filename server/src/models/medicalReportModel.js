import mongoose from "mongoose";

const medicalReportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // link to Patient model
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // link to Doctor model
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment", // optional: link to appointment if report comes from a visit
    },
    diagnosis: {
      type: String,
      required: [true, "Diagnosis is required"],
      trim: true,
    },
    prescription: [
      {
        medicine: { type: String, required: true },
        dosage: { type: String, required: true }, // e.g. "1 tablet twice daily"
        duration: { type: String, required: true }, // e.g. "7 days"
      },
    ],
    labTests: [
      {
        testName: { type: String, required: true },
        result: { type: String },
        normalRange: { type: String },
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
    reportDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MedicalReport = mongoose.model("MedicalReport", medicalReportSchema);

export default MedicalReport;
