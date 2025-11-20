import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
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
      startDate: Date,
      endDate: Date,
      days: [String],
      startTime: String,
      endTime: String,
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
