// services/appointmentService.js
import appointmentModel from "../models/appointmentModel.js";
import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";

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
  // First populate the patient itself
  const appointments = await appointmentModel
    .find({ doctorId })
    .populate("patientId") // This ensures we can access patientId.userId
    .exec();

  // Now fetch the user details safely
  const result = await Promise.all(
    appointments.map(async (appt) => {
      const patient = appt.patientId;

      // if patient or userId not present, skip
      if (!patient || !patient.userId) {
        return {
          ...appt.toObject(),
          patientUser: null,
        };
      }

      const user = await User.findById(patient.userId).select("username email");
      return {
        ...appt.toObject(),
        patientUser: user,
      };
    })
  );

  return result;
};



export const getAppointmentsByPatientService = async (patientId) => {
  return appointmentModel
    .find({ patientId })
    .populate("doctorId", "name specialization");

};

export const cancelAppointmentService = async (appointmentId, patientId) => {
  const appointment = await appointmentModel.findOne({ _id: appointmentId, patientId });
  if (!appointment) throw new Error("Appointment not found or unauthorized");

  appointment.status = "cancelled";
  await appointment.save();
  return appointment;
};
