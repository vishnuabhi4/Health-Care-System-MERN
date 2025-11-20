import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import AddDoctorInfoForm from "./AddDoctorInfoForm";

const DoctorProfileView = ({ selectedDoctor, setCurrentView }) => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = selectedDoctor._id;

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const res = await axiosInstance.get(`/admin/doctorinfo/data/${userId}`);
        setDoctorInfo(res.data.doctor);
      } catch (err) {
        setDoctorInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [userId]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500 text-lg">Loading data...</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      {/* Back Button */}
      <button
        className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
        onClick={() => setCurrentView("doctors")}
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Doctor Profile Overview
      </h2>

      {/* Layout Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* USER DETAILS CARD */}
        <div className="p-5 border border-gray-200 rounded-xl bg-slate-50 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            User Account Info
          </h3>

          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">Name:</span> {selectedDoctor.username}</p>
            <p><span className="font-medium">Email:</span> {selectedDoctor.email}</p>
            <p><span className="font-medium">Role:</span> {selectedDoctor.role}</p>
          </div>
        </div>

        {/* DOCTOR DETAILS CARD */}
        {!doctorInfo ? (
          <div className="md:col-span-2">
            <div className="p-5 border border-dashed border-gray-300 rounded-xl bg-slate-50">
             

              <AddDoctorInfoForm userId={userId} setCurrentView={setCurrentView} />
            </div>
          </div>
        ) : (
          <div className="p-5 border border-gray-200 rounded-xl bg-slate-50 shadow-sm md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Doctor Profile Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <p>
                <span className="font-medium">Specialization:</span>{" "}
                {doctorInfo.specialization}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {doctorInfo.experience} years
              </p>
              <p>
                <span className="font-medium">Qualification:</span>{" "}
                {doctorInfo.qualification}
              </p>
              <p>
                <span className="font-medium">License Number:</span>{" "}
                {doctorInfo.licenseNumber}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfileView;
