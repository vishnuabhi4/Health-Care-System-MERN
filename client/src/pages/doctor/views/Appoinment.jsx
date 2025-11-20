import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../../redux/features/doctorAppointmentSlice";// adjust path if needed

const TodaysAppointment = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(
    (state) => state.doctorAppointments
  );

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  // 🗓 Filter today's appointments
  const today = new Date().toISOString().split("T")[0];
  const todaysAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date).toISOString().split("T")[0];
    return aptDate === today;
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Today's Appointments</h3>
        <a href="#" className="text-teal-500 text-sm font-medium">
          See all
        </a>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : todaysAppointments.length === 0 ? (
        <p className="text-gray-500 text-sm">No appointments today.</p>
      ) : (
        <div className="space-y-4">
          {todaysAppointments.map((apt, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                  👨‍⚕️
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {apt.patientId?.email || "Unknown Patient"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {apt.status || "Pending"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-teal-500 font-semibold">
                  {apt.timeSlot || "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysAppointment;
