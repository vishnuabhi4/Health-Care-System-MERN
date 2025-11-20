import React, { useState } from "react";
import axiosInstance from "../api/axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateFields = () => {
    const newErrors = {};

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // validation pass/fail
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear field-level error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setMessage("Please fix the highlighted errors.");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/register", formData);
      setMessage("Registration successful!");
      console.log(res.data);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className={`w-full mb-3 p-2 border rounded ${
            errors.username ? "border-red-500" : ""
          }`}
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button className="w-full bg-blue-500 text-white py-2 rounded mt-2">
          Register
        </button>
      </form>

      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default RegisterPage;
