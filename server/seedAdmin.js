// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/userModel.js";  // adjust path if needed

dotenv.config();

const seedAdmin = async () => {
  try {
    // connect to DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // check if admin already exists
    const adminExists = await User.findOne({ email: "admin@hospital.com" });
    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // create super admin
    const admin = new User({
      username: "superadmin",
      email: "admin@hospital.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Super Admin created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    process.exit(1);
  }
};

seedAdmin();
