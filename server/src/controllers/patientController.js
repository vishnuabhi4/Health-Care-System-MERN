import Patient from "../models/patientModel.js";
import User from "../models/userModel.js";

export const createPatientDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role !== "patient") {
      return res.status(400).json({ message: "User is not a patient" });
    }

    const existing = await Patient.findOne({ userId });
    if (existing) {
      return res.status(400).json({
        message: "Patient details already exist for this user",
      });
    }

    const {
      dob,
      gender,
      bloodGroup,
      height,
      bloodPressure,
      address,
      phone,
      emergencyContact,
    } = req.body;

    const patient = await Patient.create({
      userId,
      dob,
      gender,
      bloodGroup,
      height,
      bloodPressure, // { systolic, diastolic }
      address,
      phone,
      emergencyContact,
    });

    return res.status(201).json({
      message: "Patient details created successfully",
      patient,
    });
  } catch (error) {
    console.error("Error creating patient details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};