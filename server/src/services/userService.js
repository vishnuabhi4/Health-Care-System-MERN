import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Patient from "../models/patientModel.js";



export const fetchUsersWithDetails = async () => {
  try {
    // Fetch all users with role "patient"
    const patients = await User.find({ role: "patient" }).lean();

    // Fetch patient details for each user
    const detailedPatients = await Promise.all(
      patients.map(async (patient) => {
        const details = await Patient.findOne({ userId: patient._id }).lean();
        return { ...patient, details: details || null }; // attach details or null
      })
    );

    return detailedPatients;
  } catch (err) {
    console.error("Error fetching patients:", err);
    throw err;
  }
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

export const fetchCurrentUser = async (userData) => {
  // userData contains decoded token information (ex: {_id, role})
  const user = await User.findById(userData._id).select("-password");

  return user;  // controller will handle sending response
};  

export const fetchUserByIdWithDetails = async (userId) => {
  try {
    // Fetch user by ID, exclude password for security
    const user = await User.findById(userId).select("-password").lean();
    if (!user) return null;

    let details = null;
    if (user.role === "patient") {
      details = await Patient.findOne({ userId: user._id }).lean();
    }

    return { ...user, details: details || null };
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};