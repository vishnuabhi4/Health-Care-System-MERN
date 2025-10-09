// services/appointmentService.js
import appointmentModel from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";

export const createAppointmentService = async (doctorId, patientId, date, timeSlot) => {
  // 1. Check if doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found");

  // 2. Check if slot already booked
  const exists = await appointmentModel.findOne({ doctorId, date, timeSlot });
  if (exists) throw new Error("Slot already booked");

  // 3. Create appointment
  const appointment = new appointmentModel({ doctorId, patientId, date, timeSlot });
  await appointment.save();

  return appointment;
};

export const getAppointmentsByDoctorService = async (doctorId) => {
return appointmentModel.find({ doctorId }).populate("patientId", "name email");
};

export const getAppointmentsByPatientService = async (patientId) => {
  return appointmentModel.find({ patientId }).populate("doctorId", "specialization");
};

export const cancelAppointmentService = async (appointmentId, patientId) => {
  const appointment = await appointmentModel.findOne({ _id: appointmentId, patientId });
  if (!appointment) throw new Error("Appointment not found or unauthorized");

  appointment.status = "cancelled";
  await appointment.save();
  return appointment;
};
