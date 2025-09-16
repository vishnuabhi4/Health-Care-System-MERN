import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      default: "Admin",
    },
    permissions: {
      type: [String], // e.g., ["manageUsers", "manageDoctors", "managePayments"]
      default: ["all"],
    },
    isSuperAdmin: {
      type: Boolean,
      default: false, // true if this admin can create other admins. (less prior feature)
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
