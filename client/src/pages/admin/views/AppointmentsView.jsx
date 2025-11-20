import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, CheckCircle2, XCircle } from "lucide-react";
import axiosInstance from "../../../api/axios";

const AppointmentsView = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(()=>{
      const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token"); //  login
      const res = await axiosInstance.get("/appointments", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true, //  cookie 
      });
     
    
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

    fetchAppointments()

  }, [])

  // Function to return colored badge for status
const getStatusBadge = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1";
  if (status === "completed")
    return `${base} bg-green-100 text-green-700`;
  if (status === "booked")
    return `${base} bg-yellow-100 text-yellow-700`;
  if (status === "cancelled")
    return `${base} bg-red-100 text-red-700`;
  return base;
};


 if (loading) return <p>Loading appointments...</p>;
if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Calendar size={20} className="text-purple-600" />
          Appointments
        </h3>
    
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
  {appointments.map((appt) => (
    <tr key={appt._id} className="border-b hover:bg-gray-50">
  {/* Patient */}
  <td className="px-4 py-3 flex items-center gap-2">
    <User size={16} className="text-gray-400" />
    {appt.patientId?.username || "Unknown"}
  </td>

  {/* Doctor */}
  <td className="px-4 py-3">
    {appt.doctorId?.userId?.username || "Unknown"}
    <br />
    <span className="text-xs text-gray-500">
      {appt.doctorId?.specialization || "No specialization"}
    </span>
  </td>

  {/* Date */}
  <td className="px-4 py-3">
    {new Date(appt.date).toLocaleDateString()}
  </td>

  {/* Time */}
  <td className="px-4 py-3 flex items-center gap-1">
    <Clock size={15} className="text-gray-400" /> {appt.timeSlot}
  </td>

  {/* Status */}
  <td className="px-4 py-3">
    <span className={getStatusBadge(appt.status)}>
      {appt.status === "completed" && (
        <CheckCircle2 size={14} className="text-green-600" />
      )}
      {appt.status === "booked" && (
        <Clock size={14} className="text-yellow-600" />
      )}
      {appt.status === "cancelled" && (
        <XCircle size={14} className="text-red-600" />
      )}
      {appt.status}
    </span>
  </td>
</tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default AppointmentsView;
