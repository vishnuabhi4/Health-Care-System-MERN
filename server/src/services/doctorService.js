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
  const savedDoctor = await doctor.save();
  // return await Doctor.save().then(d => d.populate("userId", "username email role"));
  return await savedDoctor.populate("userId", "username email role");
};

export const getAllDoctorsService = async () => {
  const doctors = await User.find({ role: "doctor" }).select("username email role");
 
  return doctors;
};

export const getDoctorByIdService = async (id) => {
 
  return await User.findById(id).populate("userId", "username email role");
  
};

export const updateDoctorService = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};


export const getDoctorByUserIdService = async (userId) => {
  // Step 1: Find the user
  const user = await User.findById(userId).select("username email role");
  if (!user || user.role !== "doctor") {
    throw new Error("Doctor user not found");
  }

  // Step 2: Find doctor info from Doctor collection (linked by userId)
  const doctor = await Doctor.findOne({ userId })
    .populate("userId", "username email role") // populate user info
    .populate("patients", "username email") // populate linked patients if any
    .lean();

  if (!doctor) {
    throw new Error("Doctor info not found for this user");
  }

  return doctor;
};