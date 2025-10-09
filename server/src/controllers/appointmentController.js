// controllers/appointmentController.js
import {
  createAppointmentService,
  getAppointmentsByDoctorService,
  getAppointmentsByPatientService,
  cancelAppointmentService,
} from "../services/appointmentService.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;
    const patientId = req.user._id; // assuming auth middleware sets req.user

    const appointment = await createAppointmentService(doctorId, patientId, date, timeSlot);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const appointments = await getAppointmentsByDoctorService(doctorId);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = req.user._id;
    const appointments = await getAppointmentsByPatientService(patientId);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const patientId = req.user._id;

    const appointment = await cancelAppointmentService(appointmentId, patientId);
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
