import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMedicalReport } from "../../../redux/features/medicalReportSlice";

const CreateReport = ({ selectedPatient, setCurrentView }) => {
  
  const dispatch = useDispatch();

  // Destructure patientId and appointmentId from selectedPatient
  const { patientId, appointmentId } = selectedPatient;
 
   console.log("patient, appointment", patientId, appointmentId);
  

    if (!patientId || !appointmentId) return <p>Loading patient data...</p>;

  const [formData, setFormData] = useState({
    diagnosis: "",
    medications: "",
    notes: "",
    surgery: "",
    allergy: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload including appointmentId
    const payload = {
      appointmentId,
      diagnosis: formData.diagnosis,
      medications: formData.medications.split(",").map((m) => m.trim()),
      notes: formData.notes,
      surgery: formData.surgery || "",
      allergy: formData.allergy || "",
    };
   
    try {
      const res = await dispatch(createMedicalReport({ patientId, payload }));

      if (res.meta.requestStatus === "fulfilled") {
        alert("Medical report created successfully!");
        setCurrentView("Report"); // Go back to report list
      } else {
        alert("Failed to create report");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the report");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setCurrentView("Report")}
        className="mb-4 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-4">Create Medical Report</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          className="border p-2 w-full mb-3"
          value={formData.diagnosis}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="medications"
          placeholder="Medications (comma separated)"
          className="border p-2 w-full mb-3"
          value={formData.medications}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          className="border p-2 w-full mb-3"
          value={formData.notes}
          onChange={handleChange}
        />

        <input
          type="text"
          name="surgery"
          placeholder="Surgery (optional)"
          className="border p-2 w-full mb-3"
          value={formData.surgery}
          onChange={handleChange}
        />

        <input
          type="text"
          name="allergy"
          placeholder="Allergy (optional)"
          className="border p-2 w-full mb-3"
          value={formData.allergy}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReport;
