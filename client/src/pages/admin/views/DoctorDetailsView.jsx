import React from "react";
import { ArrowLeft } from "lucide-react";

const DoctorDetailsView = ({ doctor, setCurrentView }) => {
  if (!doctor) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentView("doctors")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to List</span>
        </button>
        <h3 className="text-lg font-bold text-gray-800">Doctor Details</h3>
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 flex items-center justify-center bg-purple-100 text-5xl rounded-full">
          👨‍⚕️
        </div>

        <div className="flex-1 space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {doctor.username || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Specialty:</span>{" "}
            {doctor.specialization || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {doctor.email || "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Experience:</span>{" "}
            {doctor.experience || 0} yrs
          </p>
          <p>
            <span className="font-semibold text-gray-700">Total Patients:</span>{" "}
            {doctor.patients?.length || 0}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-3">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Edit Details
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
          Delete Doctor
        </button>
      </div>
    </div>
  );
};

export default DoctorDetailsView;
