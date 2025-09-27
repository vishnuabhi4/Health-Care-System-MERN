import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Patient from "../models/patientModel.js";

export const fetchUsersWithDetails = async () => {
  // Fetch users excluding admins
  const users = await User.find({ role: { $in: ["doctor", "patient"] } }).lean();

  // Fetch extra details for each user
  const detailedUsers = await Promise.all(users.map(async (user) => {
    let extra = null;
    if (user.role === "doctor") {
      extra = await Doctor.findOne({ userId: user._id }).lean();
    } else if (user.role === "patient") {
      extra = await Patient.findOne({ userId: user._id }).lean();
    }
    return { ...user, details: extra };
  }));

  return detailedUsers;
};
// services/userService.js
export const createUserByAdmin = async (userData) => {
  const { username, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  // role comes from admin (doctor, staff, etc.)
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,  
  });

  return newUser;
};
