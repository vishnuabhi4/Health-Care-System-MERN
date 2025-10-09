import React, { useState } from "react";
import axiosInstance from "../../api/axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //{...formData} like a live copy of object which update on each key press(e)
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      setMessage("Registration successful!");
      console.log(res.data);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
      //error.resonse...(It uses optional chaining 
     // to avoid runtime errors if any part of the error object is undefined.)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
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
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default RegisterPage;
