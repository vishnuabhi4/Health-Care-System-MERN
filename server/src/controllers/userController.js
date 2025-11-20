import { fetchUsersWithDetails, fetchCurrentUser,fetchUserByIdWithDetails } from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsersWithDetails();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const currentUser = async (req, res) =>{
  try {
    // console.log("req",req.user);
    const user = await fetchCurrentUser(req.user)
    res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Failed to fetch current user"})
  }
}

import User from "../models/userModel.js";

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // authenticate middleware sets this
    const { name, email, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update allowed fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // assuming hashing in pre-save hook

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await fetchUserByIdWithDetails(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
