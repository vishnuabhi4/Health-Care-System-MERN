import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
        },
         password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["patient", "doctor", "admin", "staff"],
            default: "patient",
        },
        profilePic: {
            type: String, // URL to image
            default: "",
        },
    },{timestamps:true}
)

const User = mongoose.model('user',userSchema)

export default User;