import React, { useState } from "react";
import axiosInstance from "../api/axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResponseMsg("");

      const { data } = await axiosInstance.post("/contact", formData);

      setResponseMsg(data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setResponseMsg("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

      <div className="bg-white border shadow p-8 rounded-2xl space-y-6">
        <p className="text-gray-700">
          For inquiries or support, reach out using the form below.
        </p>

        {responseMsg && (
          <div className="p-3 rounded-lg bg-green-100 text-green-700 border border-green-300">
            {responseMsg}
          </div>
        )}

        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
<input
  name="email"
  type="text"
  placeholder="Your Email"
  value={formData.email}
  onChange={handleChange}
  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
/>

          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition 
            disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
