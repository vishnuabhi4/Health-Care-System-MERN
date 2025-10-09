import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      const { userId, role, accessToken } = res.data;

      const user = { userId, role };
      // Save token & user
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Dispatch login action to Redux
      dispatch(login({ user, token: accessToken }));

      //  Redirect based on role
      if (user.role === "patient") navigate(`/patient/dashboard`);
      else if (user.role === "doctor") navigate(`/doctor/dashboard`);
      else if (user.role === "admin") navigate(`/admin/dashboard`);
      else navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <button className="w-full bg-green-500 text-white py-2 rounded">
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default LoginPage;
