import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,//unique: true = Creates a "unique" index in MongoDB (index:true creates index that can have multiple documents) 
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin", "staff"],
      default: "patient",  // all public registrations default to patient
      index: true,         // for role-based queries
    },
    refreshToken: {
      type: String,
      default: null,       // latest refresh token stored
    },
    isActive: {
      type: Boolean,
      default: true,       // in case you want to disable accounts later
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
