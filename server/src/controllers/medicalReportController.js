import User from "../models/userModel.js";
import Patient from "../models/patientModel.js";
import {
  createMedicalReportService,
  getAllReportsService,
  getReportByIdService,
  updateReportService,
  deleteReportService,
} from "../services/medicalReportService.js";
import medicalReportModel from "../models/medicalReportModel.js";

// Create report for a specific patient
// Create report for a specific patient
export const createReport = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { appointmentId, diagnosis, medications, notes, surgery, allergy } = req.body;

    // Validate essential fields
    if (!diagnosis || !medications || !appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Diagnosis, medications, and appointmentId are required.",
      });
    }

    // Verify patient exists
    const patientUser = await User.findById(patientId);
    if (!patientUser || patientUser.role !== "patient") {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    // Check if a report already exists for this patient + appointment
    const existingReport = await medicalReportModel.findOne({
      patient: patientId,
      appointment: appointmentId,
    });
    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: "Report already exists for this appointment",
      });
    }

    // Doctor ID from auth middleware
    const doctorId = req.user._id;

    // Create medical report
    const report = await medicalReportModel.create({
      patient: patientId,
      doctor: doctorId,
      appointment: appointmentId,
      diagnosis,
      medications,
      notes: notes || "",
      surgery: surgery || "",
      allergy: allergy || "",
    });

    // Optionally update patient's medical history
    const patientProfile = await Patient.findOne({ userId: patientId });
    if (patientProfile) {
      patientProfile.medicalHistory.push({
        appointment: appointmentId,
        illness: diagnosis,
        surgery: surgery || "",
        allergy: allergy || "",
        notes: notes || "",
      });
      await patientProfile.save();
    }

    res.status(201).json({
      success: true,
      message: "Medical report created successfully",
      data: report,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getReportByPatientId = async (req, res) => {
  try {
   
    const { patientId } = req.params;


    const report = await getReportByIdService(patientId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "No report found for this patient",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error fetching report by patient:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


//  Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await getAllReportsService();
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

//  Get report by ID
// export const getReportById = async (req, res) => {
//   try {
//     const userId = req.params.id;

//    const reports = await medicalReportModel.find({ patient: userId })
//       .populate("patient", "username email")
//       .populate("doctor", "name");

//     if (!reports) {
//       return res.status(404).json({
//         success: false,
//         message: "Report not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: reports
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// Get report by patient + appointment
export const getReportByPatientAndAppointment = async (req, res) => {
  try {
    const { patientId, appointmentId } = req.params;

    // Find the report that matches both patient and appointment
    const report = await medicalReportModel.findOne({
      patient: patientId,
      appointment: appointmentId,
    })
      .populate("patient", "username email")
      .populate("doctor", "name");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found for this appointment",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


//  Update report
export const updateReport = async (req, res) => {
  try {
    const report = await updateReportService(req.params.id, req.body);
    if (!report) {
      return res.status(404).json({ success: false, error: "Report not found" });
    }
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ✅ Delete report
export const deleteReport = async (req, res) => {
  try {
    const report = await deleteReportService(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: "Report not found" });
    }
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
