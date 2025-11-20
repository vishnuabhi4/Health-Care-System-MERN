import React, { useState, useEffect } from "react";
import { Users, Calendar, DollarSign, Bell, UserPlus } from "lucide-react";
import StatsCard from "./StatusCard";
import axiosInstance from "../../../api/axios";

const DashboardView = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState([])
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const doctorRes = await axiosInstance.get("/admin/doctorinfo/");
       const patientRes = await axiosInstance.get("/users/userlist/")
       const appointmentsdata = await axiosInstance.get('/appointments')
       
      //  console.log("appointment",appointmentsdata);
       setAppointment(appointmentsdata.data)
        setDoctors(doctorRes.data.doctors || []); // Ensure array
        setPatients(patientRes.data || [])
      } catch (error) {
        console.error("Error fetching data:", error);
        setDoctors([]);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);



  const stats = [
  {
    icon: <Users size={24} className="text-blue-600" />,
    value: loading ? "..." : doctors.length,
    label: "Total Doctors",
    change: 12,
    iconBg: "bg-blue-100",
  },
    {
      icon: <Calendar size={24} className="text-green-600" />,
      value: loading?"...":appointment.length,
      label: "Appointments Today",
      change: 8,
      iconBg: "bg-green-100",
    },
    {
      icon: <Users size={24} className="text-purple-600" />,
      value: loading ? "..." : patients.length,
      label: "Total Patients",
      change: 15,
      iconBg: "bg-purple-100",
    },
    {
      icon: <DollarSign size={24} className="text-orange-600" />,
      value: "$12,450",
      label: "Revenue Today",
      change: 5,
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
  <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Appointments</h3>

  {appointment.length > 0 ? (
    <ul className="space-y-3">
      {appointment.map((appt) => (
        <li
          key={appt._id}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
        >
          <div>
            <p className="font-medium text-gray-800">
              {appt.patientId?.username || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              {appt.doctorId?.userId?.username || "Unknown"} —{" "}
              {appt.doctorId?.specialization || "N/A"}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(appt.date).toLocaleDateString()} at {appt.timeSlot}
            </p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              appt.status === "booked"
                ? "bg-yellow-100 text-yellow-700"
                : appt.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {appt.status}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 text-sm">No recent appointments.</p>
  )}
</div>


        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition text-left">
              <UserPlus size={24} className="text-purple-600 mb-2" />
              <p className="font-semibold text-gray-800 text-sm">Add Doctor</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition text-left">
              <Bell size={24} className="text-orange-600 mb-2" />
              <p className="font-semibold text-gray-800 text-sm">View Alerts</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
