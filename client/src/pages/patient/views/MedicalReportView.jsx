import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportByPatient } from "../../../redux/features/medicalReportSlice";
import { FileText, User, Stethoscope, Calendar } from "lucide-react";

const MedicalReportView = () => {
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.medicalReports);

  const user = JSON.parse(localStorage.getItem("user"));
  const patientId = user?.userId;

  useEffect(() => {
    // Clear previous report
    dispatch({ type: 'medicalReports/clearReport' });

    if (patientId) {
      dispatch(fetchReportByPatient(patientId));
    }
  }, [dispatch, patientId]);


  console.log("Report from Redux:", report);

  if (loading)
    return <p className="text-center text-gray-600">Loading report...</p>;

  if (error)
    return <p className="text-center text-red-500">{error}</p>;

  // If no report found
  if (!report)
    return <p className="text-center text-gray-600">No reports found</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 border mt-10">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-4 mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <FileText className="text-blue-600" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Doctor Prescription</h2>
      </div>

      {/* Patient Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          <User className="text-blue-600" /> Patient Information
        </h3>
        <p className="mt-1 text-gray-700">
          <strong>Name:</strong> {report.patient?.username}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {report.patient?.email}
        </p>
      </div>

      {/* Doctor Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
          <Stethoscope className="text-blue-600" /> Doctor Information
        </h3>
        <p className="mt-1 text-gray-700">
          <strong>Doctor:</strong> {report.doctor?.username || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Specialization:</strong> {report.doctor?.specialization || "N/A"}
        </p>
      </div>

      {/* Diagnosis */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Diagnosis</h3>
        <p className="mt-1 text-gray-700">{report.diagnosis}</p>
      </div>

      {/* Medications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Medications</h3>
        <ul className="list-disc pl-6 mt-1 text-gray-700">
          {report.medications?.map((med, idx) => (
            <li key={idx}>{med}</li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Doctor Notes</h3>
        <p className="mt-1 text-gray-700">{report.notes}</p>
      </div>

      {/* Surgery */}
      {report.surgery && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Surgery</h3>
          <p className="mt-1 text-gray-700">{report.surgery}</p>
        </div>
      )}

      {/* Allergy */}
      {report.allergy && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Allergy</h3>
          <p className="mt-1 text-gray-700">{report.allergy}</p>
        </div>
      )}

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-600 border-t pt-4">
        <Calendar className="text-gray-600" />
        <span>
          Report Created:{" "}
          {new Date(report.createdAt).toLocaleDateString("en-IN")}
        </span>
      </div>
    </div>
  );
};

export default MedicalReportView;
