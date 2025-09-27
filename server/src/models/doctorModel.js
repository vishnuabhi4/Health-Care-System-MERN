import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Helps with fast lookups
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number, // in years
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
schedule: {
  startDate: Date,  // e.g. 2025-10-01
  endDate: Date,    // e.g. 2025-10-31
  days: [String],   // ["Monday", "Wednesday", "Friday"]
  startTime: String, // "10:00"
  endTime: String   // "16:00"
},
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
