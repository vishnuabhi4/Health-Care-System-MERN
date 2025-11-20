// controllers/appointmentController.js
import appointmentModel from "../models/appointmentModel.js";
import {
  createAppointmentService,
  getAppointmentsByDoctorService,
  getAppointmentsByPatientService,
  cancelAppointmentService,
} from "../services/appointmentService.js";
import Doctor from "../models/doctorModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;
    const patientId = req.user._id; 

    const appointment = await createAppointmentService(doctorId, patientId, date, timeSlot);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const userId = req.params.doctorId;

    // Find doctor by userId (since each doctor has a user reference)
    const doctor = await Doctor.findOne({ userId });
 
    if (!doctor) {
      return res.status(404).json({
        success: false,  
        message: "Doctor not found for this user ID",
      });
    }

    // Use doctor._id to fetch appointments
    const appointments = await getAppointmentsByDoctorService(doctor._id);

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = req.user._id; //This _id comes automatically from the decoded JWT of whoever is logged in.
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

export const getAllAppointments = async (req,res)=>{
  try {
        const appointments = await appointmentModel.find()
            // 1️ populate doctor model
      .populate({
        path: "doctorId",
        populate: {
          path: "userId", // from Doctor → User
          select: "username email", // get doctor’s name/email
        },
        select: "specialization", // from Doctor model
      })
      // 2️ populate patient (directly from User model)
      .populate("patientId", "username email");

    res.status(200).json(appointments);
  } catch (error) {
    console.error("(appointmentController)Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}