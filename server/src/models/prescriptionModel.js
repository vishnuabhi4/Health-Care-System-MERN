import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medicines: [
      {
        name: { type: String, required: true }, // e.g., "Paracetamol"
        dosage: { type: String, required: true }, // e.g., "500mg"
        frequency: { type: String, required: true }, // e.g., "Twice daily"
        duration: { type: String, required: true }, // e.g., "5 days"
        notes: { type: String }, // e.g., "Take after meals"
      },
    ],
    instructions: {
      type: String,
      trim: true,
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
