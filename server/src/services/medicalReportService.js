import MedicalReport from "../models/medicalReportModel.js";
import mongoose from "mongoose";


// Create new report
export const createMedicalReportService = async (data) => {
  const report = new MedicalReport(data);
  return await report.save();
};

// Get all reports
export const getAllReportsService = async () => {
  return await MedicalReport.find()
    .populate("patient", "username email")
    .populate("doctor", "username role specialization")
    .populate("appointment");
};

// Get single report by ID
export const getReportByIdService = async (patientId) => {

  return await MedicalReport.findOne({ patient: patientId })
    .populate("patient", "username email")
    .populate("doctor", "username role specialization")
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
