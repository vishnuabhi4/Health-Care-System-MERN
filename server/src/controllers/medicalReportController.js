import {
  createMedicalReportService,
  getAllReportsService,
  getReportByIdService,
  updateReportService,
  deleteReportService,
} from "../services/medicalReportService.js";

// Create report
export const createReport = async (req, res) => {
  try {
    // console.log(req.body);
    const report = await createMedicalReportService(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await getAllReportsService();
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get report by ID
export const getReportById = async (req, res) => {
  try {
    const report = await getReportByIdService(req.params.id);
    if (!report) return res.status(404).json({ success: false, error: "Report not found" });
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update report
export const updateReport = async (req, res) => {
  try {
    const report = await updateReportService(req.params.id, req.body);
    if (!report) return res.status(404).json({ success: false, error: "Report not found" });
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete report
export const deleteReport = async (req, res) => {
  try {
    const report = await deleteReportService(req.params.id);
    if (!report) return res.status(404).json({ success: false, error: "Report not found" });
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
