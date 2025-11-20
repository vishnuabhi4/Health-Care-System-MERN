import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import { Check } from "lucide-react";

const AddDoctorInfoForm = ({ userId, initialData, setCurrentView }) => {
  console.log(userId,"userId");
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    specialization: initialData?.specialization || "",
    experience: initialData?.experience || "",
    qualification: initialData?.qualification || "",
    licenseNumber: initialData?.licenseNumber || "",
    schedule: {
      startDate: initialData?.schedule?.startDate || "",
      endDate: initialData?.schedule?.endDate || "",
      days: initialData?.schedule?.days || [],
      startTime: initialData?.schedule?.startTime || "",
      endTime: initialData?.schedule?.endTime || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch user info if adding a new doctor
  useEffect(() => {
    if (!initialData) {
      const fetchUser = async () => {
        try {
          const res = await axiosInstance.get(`/users/${userId}`);
          setFormData((prev) => ({
            ...prev,
            name: res.data.username || res.data.name || "",
          }));
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      };
      fetchUser();
    }
  }, [userId, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      userId,
      specialization: formData.specialization,
      experience: Number(formData.experience),
      qualification: formData.qualification,
      licenseNumber: formData.licenseNumber,
      schedule: {
        startDate: formData.schedule.startDate
          ? new Date(formData.schedule.startDate)
          : null,
        endDate: formData.schedule.endDate
          ? new Date(formData.schedule.endDate)
          : null,
        days: formData.schedule.days,
        startTime: formData.schedule.startTime,
        endTime: formData.schedule.endTime,
      },
    };

    console.log("Submitting payload:", payload);

    try {
      await axiosInstance.post(`admin/doctorinfo/${userId}`, payload);
      setSuccess(true);

      // Reset form
      setFormData({
        name: "",
        specialization: "",
        experience: "",
        qualification: "",
        licenseNumber: "",
        schedule: {
          startDate: "",
          endDate: "",
          days: [],
          startTime: "",
          endTime: "",
        },
      });
    } catch (err) {
      console.error("Error adding doctor info:", err); // full Axios error object
      console.log("Response data:", err.response?.data); // server error message
      console.log("Response status:", err.response?.status);
      console.log("Request config:", err.config);
      alert("Failed to add doctor info. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-100 rounded-xl text-green-700 font-semibold">
        Doctor info added successfully!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => setCurrentView("doctors")}
        className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        ← Back
      </button>

      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Doctor Information
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name is read-only if fetched from user schema */}

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Doctor Name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={(e) =>
            setFormData({ ...formData, specialization: e.target.value })
          }
          required
        />

        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Experience (in years)"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          required
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={(e) =>
            setFormData({ ...formData, qualification: e.target.value })
          }
          required
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={(e) =>
            setFormData({ ...formData, licenseNumber: e.target.value })
          }
          required
        />

        <h4 className="text-md font-semibold text-gray-700 mt-4">Schedule</h4>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={formData.schedule.startDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                schedule: { ...formData.schedule, startDate: e.target.value },
              })
            }
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={formData.schedule.endDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                schedule: { ...formData.schedule, endDate: e.target.value },
              })
            }
          />
          <input
            type="text"
            className="col-span-2 border border-gray-300 rounded-lg px-3 py-2"
            placeholder='Days (e.g. "Monday, Wednesday, Friday")'
            value={formData.schedule.days}
            onChange={(e) =>
              setFormData({
                ...formData,
                schedule: {
                  ...formData.schedule,
                  days: e.target.value.split(","),
                },
              })
            }
          />
          <input
            type="time"
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={formData.schedule.startTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                schedule: { ...formData.schedule, startTime: e.target.value },
              })
            }
          />
          <input
            type="time"
            className="border border-gray-300 rounded-lg px-3 py-2"
            value={formData.schedule.endTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                schedule: { ...formData.schedule, endTime: e.target.value },
              })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Check size={20} /> {loading ? "Saving..." : "Save Doctor Info"}
        </button>
      </form>
    </div>
  );
};

export default AddDoctorInfoForm;
