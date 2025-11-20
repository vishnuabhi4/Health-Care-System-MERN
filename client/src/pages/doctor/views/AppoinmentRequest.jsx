import { useEffect, useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../../redux/features/doctorAppointmentSlice";
import { CheckCircle, XCircle } from "lucide-react";


const AppointmentRequest = () => {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector(
    (state) => state.doctorAppointments
  );
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  return (
    <div className="flex gap-4 p-4">
      {/* LEFT SIDE — List */}
      <div className="w-1/2 max-h-[500px] overflow-y-auto bg-gray-100 rounded-xl p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-2">Appointments</h2>

        {loading ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((appt) => (
              <li
                key={appt._id}
                onClick={() => setSelectedAppointment(appt)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-100 ${
                  selectedAppointment?._id === appt._id
                    ? "bg-blue-200 font-semibold"
                    : "bg-white"
                }`}
              >
                <p>{appt.patientId?.username || "Unknown Patient"}</p>
                <p className="text-sm text-gray-500">
                  {new Date(appt.date).toDateString()} – {appt.timeSlot}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* RIGHT SIDE — Details */}
      <div className="w-1/2 bg-white rounded-xl p-4 shadow-md">
        {selectedAppointment ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Appointment Details</h2>
            <p><strong>Patient:</strong> {selectedAppointment.patientId?.username}</p>
            <p><strong>Email:</strong> {selectedAppointment.patientId?.email}</p>
            <p><strong>Date:</strong> {new Date(selectedAppointment.date).toDateString()}</p>
            <p><strong>Time Slot:</strong> {selectedAppointment.timeSlot}</p>
            <p><strong>Status:</strong> {selectedAppointment.status}</p>
          </>
        ) : (
          <p className="text-gray-500">Select an appointment to view details</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequest;