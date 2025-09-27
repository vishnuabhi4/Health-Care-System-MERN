import { fetchUsersWithDetails } from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsersWithDetails();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
