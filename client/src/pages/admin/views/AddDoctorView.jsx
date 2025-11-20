import React, { useState } from "react";
import axiosInstance from '../../../api/axios.js'
import LoadingButton from "../../../components/Buttons/LoadingButton.jsx";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await axiosInstance.post("/admin/users/doctors", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "doctor",
      });

      setSuccess(true);

      // reset fields
      setFormData({
        username: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.error("Error creating doctor:", err);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="space-y-4 bg-white p-6 rounded-lg shadow"
    >

      <input
        type="text"
        name="username"
        placeholder="Doctor Name"
        autoComplete="off"
        value={formData.username}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="new-email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <LoadingButton
        type="submit"
        loading={loading}
        success={success}
        error={error}
        text="Add Doctor"
        successText="Added!"
        errorText="Failed"
      />
    </form>
  );
};

export default AddDoctorForm;
