import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerUser = async (userData) => {

  const { username, email, password } = userData; // don't take role from client

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  // Force role to patient
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role: "patient",  //  hardcoded for safety (only users can register)
  });

  return newUser;
};


export const updateUser = async (userId, updateData) => {
  // Destructure to handle password separately
  const { username, email, password } = updateData;

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Update fields only if they are provided
  if (username) user.username = username;
  if (email) user.email = email;

  // Handle password change safely
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  // Save the updated user
  const updatedUser = await user.save();

  // Hide password before sending back
  updatedUser.password = undefined;

  return updatedUser;
};

// Generate tokens
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("No refresh token provided");

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user);
  return { accessToken: newAccessToken };
};

export const logoutUser = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  if (!user) return;

  user.refreshToken = null;
  await user.save();
};
