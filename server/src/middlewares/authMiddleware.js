import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

//     req.user = {
//   id: decoded.id,
//   role: decoded.role
// };
req.user = user;
    
    next();

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // Access token expired
      return res.status(401).json({ message: "Access token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      // Invalid token (tampered or malformed)
      return res.status(403).json({ message: "Invalid token" });
    }

    console.error("Auth Middleware Error:", err);
    return res.status(500).json({ message: "Authentication failed" });
  }
};
