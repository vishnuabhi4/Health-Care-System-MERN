import {
  createDoctorService,
  getAllDoctorsService,
  getDoctorByIdService,
  getDoctorByUserIdService,
} from "../services/doctorService.js";
import Doctor from "../models/doctorModel.js";
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
    const doctors = await getAllDoctorsService();
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// by specilization
export const getDoctorsBySpecialization = async (req, res) => {
  try {
    const specialization = req.params.spec;
    
    const doctors = await Doctor.find({ specialization })
  .populate("userId", "name email");

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

//  Controller: Fetch doctor info by userId (doctor data is in a collection named doctor, but doctor auth data is stored in user model)
export const getDoctorByUserId = async (req, res) => {
  try {
    
    const { userId } = req.params;
    
    // Optional: restrict access to admin or the doctor themselves
    // if (req.user.role !== "admin" && req.user._id.toString() !== userId) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    const doctor = await getDoctorByUserIdService(userId);

    res.status(200).json({
      message: "Doctor info fetched successfully",
      doctor,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || "Failed to fetch doctor info",
    });
  }
};