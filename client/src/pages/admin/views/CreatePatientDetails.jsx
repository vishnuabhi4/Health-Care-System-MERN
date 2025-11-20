import React, { useState } from "react";
import axiosInstance from "../../../api/axios";

const CreatePatientDetails = ({ user, setCurrentView, setSelectedUser }) => {
  const [form, setForm] = useState({
    dob: "",
    gender: "",
    bloodGroup: "",
    height: "",
    systolic: "",
    diastolic: "",
    address: "",
    phone: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      dob: form.dob,
      gender: form.gender,
      bloodGroup: form.bloodGroup || "",
      height: form.height ? Number(form.height) : undefined,
      bloodPressure: {
        systolic: Number(form.systolic),
        diastolic: Number(form.diastolic),
      },
      address: form.address,
      phone: form.phone,
      emergencyContact: {
        name: form.emergencyContactName,
        phone: form.emergencyContactPhone,
        relation: form.emergencyContactRelation,
      },
    };

    const { data } = await axiosInstance.post(
      `/patient/create/${user._id}`,
      payload
    );

    // Update UI
    setSelectedUser({ ...user, details: data.patient });
    setCurrentView("UserDetails");
  };

  return (
    <form onSubmit={submitHandler} className="p-6 space-y-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">Create Patient Profile</h2>

      <input type="date" name="dob" onChange={handleChange} className="input" required />

      <select name="gender" onChange={handleChange} className="input">
        <option value="">Select gender</option>
        <option>male</option>
        <option>female</option>
        <option>other</option>
      </select>

      <select name="bloodGroup" onChange={handleChange} className="input">
        <option value="">Select blood group</option>
        <option>A+</option><option>A-</option><option>B+</option>
        <option>B-</option><option>AB+</option><option>AB-</option>
        <option>O+</option><option>O-</option>
      </select>

      <input name="height" placeholder="Height (cm)" onChange={handleChange} className="input" />

      <div className="grid grid-cols-2 gap-4">
        <input name="systolic" placeholder="Systolic BP" onChange={handleChange} className="input" />
        <input name="diastolic" placeholder="Diastolic BP" onChange={handleChange} className="input" />
      </div>

      <input name="address" placeholder="Address" onChange={handleChange} className="input" required />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="input" required />

      <h3 className="font-semibold mt-4">Emergency Contact</h3>
      <input name="emergencyContactName" placeholder="Name" onChange={handleChange} className="input" />
      <input name="emergencyContactPhone" placeholder="Phone" onChange={handleChange} className="input" />
      <input name="emergencyContactRelation" placeholder="Relation" onChange={handleChange} className="input" />

      <button className="w-full bg-blue-600 text-white py-2 rounded">Save</button>
    </form>
  );
};

export default CreatePatientDetails;
