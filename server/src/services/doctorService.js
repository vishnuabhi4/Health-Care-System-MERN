import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";

export const createDoctorService = async (doctorData) => {
  // doctorData must contain userId
  const { userId } = doctorData;

  // 1. Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found. Please create a User with role 'doctor' first.");
  }

  // 2. Check if the role is "doctor"
  if (user.role !== "doctor") {
    throw new Error("This user is not registered as a doctor.");
  }

  // 3. Check if doctor profile already exists for this user
  const existingDoctor = await Doctor.findOne({ userId });
  if (existingDoctor) {
    throw new Error("Doctor profile already exists for this user.");
  }

  // 4. Create doctor profile
  const doctor = new Doctor(doctorData);
  return await doctor.save().then(d => d.populate("userId", "username email role"));
};

export const getAllDoctorsService = async () => {
  return await Doctor.find().populate("userId", "username email role");
};

export const getDoctorByIdService = async (id) => {
  return await Doctor.findById(id).populate("userId", "username email role");
};

export const updateDoctorService = async (id, updateData) => {
  return await Doctor.findByIdAndUpdate(id, updateData, { new: true });
};
