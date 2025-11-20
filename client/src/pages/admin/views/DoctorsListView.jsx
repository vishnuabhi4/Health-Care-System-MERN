import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";

const DoctorsListView = ({ setCurrentView, setSelectedDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const usersRes = await axiosInstance.get("/admin/doctorinfo");
        const userDoctors = usersRes.data.doctors || [];
        setDoctors(userDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">All Doctors</h3>
      </div>

      {loading ? (
        <div className="p-6 text-gray-500">Loading doctors...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 text-sm">
                <th className="p-4 font-semibold">Doctor</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr
                  key={doc._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setCurrentView("doctorProfile");
                  }}
                >
                  <td className="p-4 font-semibold text-purple-600 underline">
                    {doc.username}
                  </td>
                  <td className="p-4">{doc.email}</td>
                  <td className="p-4">{doc.role}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorsListView;
