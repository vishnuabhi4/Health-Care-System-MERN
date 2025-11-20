import React, { useEffect } from "react";
import { Calendar, Bell, HeartPulse, Activity } from "lucide-react";
import StatsCard from "./StatusCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointments } from "../../../redux/features/appointmentsSlice";

const DashboardView = () => {
  const dispatch = useDispatch();

  const { data: appointments, loading } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  useEffect(()=>{
   
    
  },[appointments])

  const stats = [
    {
      icon: <Calendar size={24} className="text-blue-600" />,
      value: loading ? "..." : appointments.length,
      label: "My Appointments",
      change: 4,
      iconBg: "bg-blue-100",
    },
    {
      icon: <HeartPulse size={24} className="text-red-600" />,
      value: "Good",
      label: "Health Status",
      change: 0,
      iconBg: "bg-red-100",
    },
    {
      icon: <Activity size={24} className="text-green-600" />,
      value: "5",
      label: "Active Prescriptions",
      change: 1,
      iconBg: "bg-green-100",
    },
    {
      icon: <Bell size={24} className="text-orange-600" />,
      value: "3",
      label: "New Notifications",
      change: 0,
      iconBg: "bg-orange-100",
    },
  ];

  return (
    <div>
      {/* Top stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Lower panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Upcoming Appointments
          </h3>

         {loading ? (
  <p className="text-gray-500 text-sm">Loading appointments...</p>
) : appointments.length > 0 ? (
  <ul className="space-y-2">
    {appointments.slice(0, 5).map((appt) => (
      <li
        key={appt._id}
        className="p-3 border border-gray-100 rounded-lg flex justify-between"
      >
        <div>
          <p className="font-semibold text-gray-800 ">
            {appt?.doctorId?.name || "Dr. Unknown"}
          </p>

          <p className="text-sm text-gray-500 ">
            {new Date(appt.date).toLocaleDateString()} at {appt.timeSlot}
          </p>
        </div>

        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 flex items-center">
          {appt.status || "Scheduled"}
        </span>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500 text-sm">No upcoming appointments.</p>
)}

        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-left">
              <Calendar size={24} className="text-blue-600 mb-2" />
              <p className="font-semibold text-gray-800 text-sm">
                Book Appointment
              </p>
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
