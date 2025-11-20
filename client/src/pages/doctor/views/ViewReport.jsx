import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportByPatientAndAppointment } from "../../../redux/features/medicalReportSlice";
function ViewReport({ selectedPatient = {}, setCurrentView }) {
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.medicalReports);

  // Safely get patientId and appointmentId
  const patientId = selectedPatient?.patientId;
  const appointmentId = selectedPatient?.appointmentId;

  useEffect(() => {
    if (patientId && appointmentId) {
      dispatch(fetchReportByPatientAndAppointment({ patientId, appointmentId }));
    }
  }, [dispatch, patientId, appointmentId]);

  // Show loading messages
  if (!patientId || !appointmentId) return <p>Loading selected patient...</p>;
  if (loading) return <p>Loading report...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!report) return <p>No report found for this appointment.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 border">

  <button
    type="button"
    onClick={() => setCurrentView("Report")}
    className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
  >
    ← Back
  </button>

  <h2 className="text-2xl font-semibold mb-6 text-gray-800">
    Medical Report Summary
  </h2>

  {/* Report Card */}
  <div className="space-y-4">

    <div className="grid grid-cols-1 gap-4">

      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-sm text-gray-500 font-medium">Diagnosis</p>
        <p className="text-gray-800 font-semibold mt-1">{report.diagnosis}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <p className="text-sm text-gray-500 font-medium">Medications</p>
        <p className="text-gray-800 mt-1">{report.medications.join(", ")}</p>
      </div>

      {report.notes && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500 font-medium">Notes</p>
          <p className="text-gray-800 mt-1">{report.notes}</p>
        </div>
      )}

      {report.surgery && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500 font-medium">Surgery</p>
          <p className="text-gray-800 mt-1">{report.surgery}</p>
        </div>
      )}

      {report.allergy && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-sm text-gray-500 font-medium">Allergy</p>
          <p className="text-gray-800 mt-1">{report.allergy}</p>
        </div>
      )}
    </div>

    {/* Doctor & Patient Section */}
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Details</h3>

      <div className="flex flex-col gap-3 text-gray-700">

        <p>
          <span className="font-medium text-gray-600">Doctor:</span>{" "}
          {report.doctor?.name}
        </p>

        <p>
          <span className="font-medium text-gray-600">Patient:</span>{" "}
          {report.patient?.username} ({report.patient?.email})
        </p>
      </div>
    </div>

  </div>
</div>

  );
}


 export default ViewReport