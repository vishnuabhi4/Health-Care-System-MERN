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

export const getDoctorsListController = async (req, res) => {
  try {
    const doctors = await FetchDoctorsWithDetails();
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch doctors list",
    });
  }
};