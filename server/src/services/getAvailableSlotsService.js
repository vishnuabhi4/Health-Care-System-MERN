// services/doctorService.js
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";


export const getAvailableSlotsService = async (doctorId) => {
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new Error("Doctor not found");

  const { startDate, endDate, days, startTime, endTime } = doctor.schedule; //from doctor schema 

  //  Generate all dates between startDate and endDate for selected days
  const slotDates = [];
  const currentDate = new Date(startDate);
  // console.log("current date",currentDate);
  //   console.log("current date + 1",currentDate+2);

  while (currentDate <= endDate) {
  
    const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
   
    if (days.includes(dayName)) {
      slotDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  //  Generate time slots for each date
  const generateTimeSlots = (start, end, interval = 30) => {
    const slots = [];
    let [hour, minute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    while (hour < endHour || (hour === endHour && minute < endMinute)) {
      slots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);
      minute += interval;
      if (minute >= 60) {
        hour++;
        minute -= 60;
      }
    }
    return slots;
  };

  const allSlots = [];

  for (const date of slotDates) {
    // Step 3: Remove already booked slots
    const appointments = await Appointment.find({ doctorId, date });
    const bookedTimes = appointments.map(a => a.timeSlot);

    const slots = generateTimeSlots(startTime, endTime).filter(time => !bookedTimes.includes(time));

    if (slots.length) allSlots.push({ date, slots });
  }

  return allSlots;
};
