import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointments } from "../../../redux/features/doctorAppointmentSlice";
import { fetchAllReports } from "../../../redux/features/medicalReportSlice";

const CreateReportList = ({ setSelectedPatient, setCurrentView }) => {
  const dispatch = useDispatch();

  const { appointments = [], loading } = useSelector(
    (state) => state.doctorAppointments
  );

  const { reports = [] } = useSelector((state) => state.medicalReports || {});

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
    dispatch(fetchAllReports()); // Load all medical reports
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Prescription Report</h2>

      {appointments.map((appt) => {
        const { _id: appointmentId, patientId } = appt;
        const patientIdOnly = patientId?._id; // safely get patient ID

        const reportExists = reports.some(
          (rep) =>
            rep.patient?._id?.toString() === patientIdOnly &&
            rep.appointment?._id?.toString() === appointmentId
        );

        return (
          <div
            key={appointmentId}
            className="p-4 border rounded mb-3 flex justify-between"
          >
            <div>
              <p>
                <strong>Patient:</strong> {patientId?.username}
              </p>
              <p>
                <strong>Email:</strong> {patientId?.email}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appt.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appt.timeSlot}
              </p>
            </div>

            <div>
              <button
                className={`${
                  reportExists ? "bg-blue-500" : "bg-green-500"
                } text-white px-4 py-2 rounded`}
                onClick={() => {
                  setSelectedPatient({
                    patientId: patientIdOnly,
                    appointmentId: appointmentId,
                  });

                  reportExists
                    ? setCurrentView("ViewReport")
                    : setCurrentView("CreateReport");
                }}
              >
                {reportExists ? "View Report" : "Create Report"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateReportList;
