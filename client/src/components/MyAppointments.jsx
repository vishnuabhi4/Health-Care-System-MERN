import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointments,cancelAppointment  } from "../redux/features/appointmentsSlice";


const MyAppointments = () => {
  const dispatch = useDispatch();
  const { data: appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  // local state to track which appointment is being cancelled
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  const handleCancel = async (id) => {
    // basic confirmation (optional)
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    setCancellingId(id);
    try {
      // unwrap to throw on error
      await dispatch(cancelAppointment(id)).unwrap();
      // optionally show toast / notification
    } catch (err) {
      // handle error - simple alert for now
      alert(err || "Failed to cancel");
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  if (!appointments || appointments.length === 0)
    return (
      <p className="text-center text-lg mt-10">
        You have no appointments yet.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-5">My Appointments</h2>

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="p-4 border rounded-lg shadow bg-white flex justify-between"
          >
            <div>
              <p className="font-semibold text-lg">
                Doctor: {appt.doctorId?.name || "Doctor"}
              </p>
              <p className="text-gray-600">
                Date: {new Date(appt.date).toDateString()}
              </p>
              <p className="text-gray-600">Time: {appt.timeSlot}</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <span
                className={`px-3 py-1 rounded-full flex items-center text-sm font-medium mb-2 ${
                  appt.status === "booked"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appt.status}
              </span>

              {appt.status === "booked" && (
                <button
                  onClick={() => handleCancel(appt._id)}
                  disabled={cancellingId === appt._id}
                  className={`px-3 py-1 text-sm rounded text-white ${
                    cancellingId === appt._id ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {cancellingId === appt._id ? "Cancelling..." : "Cancel"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;