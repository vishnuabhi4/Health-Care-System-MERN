import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // links to login credentials
      required: true,
    },
    permissions: {
      type: [String], // e.g., ["manageUsers", "manageDoctors", "manageBilling"]
      default: ["all"],
    },
    department: {
      type: String, // optional, e.g., "HR", "Finance"
      default: "General",
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
