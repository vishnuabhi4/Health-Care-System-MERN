import {
  createDoctorService,
  getAllDoctorsService,
  getDoctorByIdService,
} from "../services/doctorService.js";
import { getAvailableSlotsService } from "../services/getAvailableSlotsService.js";

export const getAvailableSlots = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const available = await getAvailableSlotsService(doctorId);

    res.json({ doctorId, available });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /doctors

export const createDoctor = async (req, res) => {
  try {
    const { userId } = req.params; // get userId from URL
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required in URL" });
    }

    const doctorData = { ...req.body, userId }; // merge userId into doctorData

    const doctor = await createDoctorService(doctorData);
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /doctors
export const getDoctors = async (req, res) => {
  try {
    console.log("get doctors");
    const doctors = await getAllDoctorsService();
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /doctors/:id
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await getDoctorByIdService(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
