import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../../redux/features/doctorAppointmentSlice";

const DoctorAppointmentsPage = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(
    (state) => state.doctorAppointments
  );
   
  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Loading appointments...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {appt.patientId?.username || "Unknown Patient"}
              </h3>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  appt.status === "booked"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {appt.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              <strong>Date:</strong>{" "}
              {new Date(appt.date).toLocaleDateString("en-IN")}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Time:</strong> {appt.timeSlot}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {appt.patientId?.email}
            </p>

           
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;
