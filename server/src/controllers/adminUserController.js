import { createUserByAdmin } from "../services/userService.js";

// Controller function
export const createDoctorUserController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Call the async service function
    const user = await createUserByAdmin({
      username,
      email,
      password,
      role: "doctor", // force role to doctor
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
