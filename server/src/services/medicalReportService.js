import MedicalReport from "../models/medicalReportModel.js";

// Create new report
export const createMedicalReportService = async (reportData) => {
  const report = new MedicalReport(reportData);
  return await report.save();
};

// Get all reports
export const getAllReportsService = async () => {
  return await MedicalReport.find()
    .populate("patient", "name email")
    .populate("doctor", "name specialization")
    .populate("appointment");
};

// Get single report by ID
export const getReportByIdService = async (reportId) => {
  return await MedicalReport.findById(reportId)
    .populate("patient", "name email")
    .populate("doctor", "name specialization")
    .populate("appointment");
};

// Update report
export const updateReportService = async (reportId, updateData) => {
  return await MedicalReport.findByIdAndUpdate(reportId, updateData, { new: true });
};

// Delete report
export const deleteReportService = async (reportId) => {
  return await MedicalReport.findByIdAndDelete(reportId);
};
