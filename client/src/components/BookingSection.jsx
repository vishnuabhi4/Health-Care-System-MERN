import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axios";
import { Calendar, Clock, User, Mail } from "lucide-react";

const AppointmentBooking = () => {
  useEffect(() => {
    const loadRazorpayScript = () => {
      if (document.querySelector("#razorpay-script")) return;

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
   
       //  Add these listeners HERE (this file, this block)
        document.addEventListener("razorpay.success", (e) => {
          console.log(" RAZORPAY SUCCESS EVENT", e);
        });

        document.addEventListener("payment.failed", (e) => {
          console.log(" PAYMENT FAILED EVENT", e);
        });
      };

      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    doctor: "",
    notes: "",
  });
  //------------------------------
  const appointmentRef = useRef(appointmentData);

  useEffect(() => {
    appointmentRef.current = appointmentData;
  }, [appointmentData]);
  //---------------------------------
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const services = [
    "General Consultation",
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Ophthalmology",
    "Psychiatry",
  ];

  const handleInputChange = (field, value) => {
    setAppointmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //  Fetch doctors for chosen service
  const handleServiceChange = async (service) => {
    handleInputChange("service", service);

    if (!service) {
      setFilteredDoctors([]);
      return;
    }

    try {
      const res = await axiosInstance.get(
        `/admin/doctorinfo/specialization/${service}`
      );

      setFilteredDoctors(res.data || []);
      handleInputChange("doctor", "");
      setAvailableDates([]);
      setAvailableTimes([]);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  //  Fetch available dates when doctor is selected
  const handleDoctorChange = async (doctorId) => {
    handleInputChange("doctor", doctorId);

    try {
      const res = await axiosInstance.get(
        `/admin/doctorinfo/${doctorId}/available-slots`
      );
      console.log("setAvailableTimes",res);
      
      setAvailableDates(res.data.available || []);
      setAvailableTimes([]);
      handleInputChange("date", "");
      handleInputChange("time", "");
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  //  When a date is selected → load its time slots
  const handleDateSelect = (dateString) => {
    handleInputChange("date", dateString);

    const found = availableDates.find(
      (d) => d.date.slice(0, 10) === dateString
    );

    setAvailableTimes(found?.slots || []);
    handleInputChange("time", "");
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    handleInputChange("time", time);
  };

  const handlePayment = async () => {
  try {
    const amount = 1; // example amount

    // Step 1: Create Razorpay order from backend
    const { data: order } = await axiosInstance.post("/payment/order", { amount });

    // Step 2: Fetch Razorpay key
    const { data: keyData } = await axiosInstance.get("/payment/key");

    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Check console for errors.");
      return;
    }

    const options = {
      key: keyData.key,
      amount: order.amount,
      currency: order.currency,
      name: "HealthCare System",
      description: "Doctor Appointment Booking",
      order_id: order.id,
      handler: async function (response) {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
       const patientId = user?.userId;

          
          const payload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,

            // Required by backend
            patientId,
            doctorId: appointmentRef.current.doctor,
            timeSlot: appointmentRef.current.time,
            date: appointmentRef.current.date,
            name: appointmentRef.current.name,
            email: appointmentRef.current.email,
            phone: appointmentRef.current.phone,
            service: appointmentRef.current.service,
            notes: appointmentRef.current.notes,
          };

       

          const verifyRes = await axiosInstance.post("/payment/verify", payload);

        if (verifyRes.data.success) {
  alert("Payment Successful & Appointment Booked!");

  // Reset form data
  setAppointmentData({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    doctor: "",
    notes: "",
  });

  setSelectedTimeSlot("");
  setFilteredDoctors([]);
  setAvailableDates([]);
  setAvailableTimes([]);
} else {
            alert("Payment verified but appointment creation failed.");
          }
        } catch (err) {
          console.error("Error during payment verification:", err);
          alert("Payment succeeded, but something went wrong saving appointment.");
        }
      },
      prefill: {
        name: appointmentData.name,
        email: appointmentData.email,
        contact: appointmentData.phone,
      },
      theme: {
        color: "#007bff",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Payment initiation failed:", error);
    alert("Something went wrong while processing payment. Try again.");
  }
};


  const isFormValid = () =>
    appointmentData.name &&
    appointmentData.email &&
    appointmentData.phone &&
    appointmentData.service &&
    appointmentData.date &&
    appointmentData.time;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Book an Appointment
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border">
          <div className="space-y-6">
            {/* Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" /> Personal
                Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 border rounded-lg w-full"
                  value={appointmentData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="p-3 border rounded-lg w-full"
                  value={appointmentData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <input
                type="tel"
                placeholder="Phone Number"
                className="mt-6 p-3 border rounded-lg w-full"
                value={appointmentData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>

            {/* Medical Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" /> Medical
                Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Dropdown */}
                <select
                  className="p-3 border rounded-lg w-full"
                  value={appointmentData.service}
                  onChange={(e) => handleServiceChange(e.target.value)}
                >
                  <option value="">Choose a service</option>
                  {services.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service}
                    </option>
                  ))}
                </select>

                {/* Doctors filtered by service */}
                <select
                  className="p-3 border rounded-lg w-full"
                  value={appointmentData.doctor}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  disabled={!filteredDoctors.length}
                >
                  <option value="">
                    {filteredDoctors.length
                      ? "Select a doctor"
                      : "Select a service first"}
                  </option>

                  {filteredDoctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                className="w-full mt-6 p-3 border rounded-lg"
                rows="3"
                placeholder="Additional notes"
                value={appointmentData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              ></textarea>
            </div>

            {/* Date & Time */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" /> Date & Time
                Selection
              </h3>

              {/*  Date Dropdown (only available dates) */}
              <select
                className="p-3 border rounded-lg w-full mb-4"
                value={appointmentData.date}
                onChange={(e) => handleDateSelect(e.target.value)}
                disabled={!availableDates.length}
              >
                <option value="">
                  {availableDates.length
                    ? "Select a date"
                    : "Select doctor first"}
                </option>

                {availableDates.map((d, idx) => (
                  <option key={idx} value={d.date.slice(0, 10)}>
                    {new Date(d.date).toDateString()}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`p-3 text-sm border rounded-lg ${
                      selectedTimeSlot === time
                        ? "bg-blue-600 text-white"
                        : "border-gray-300 hover:bg-blue-50"
                    }`}
                    onClick={() => handleTimeSlotSelect(time)}
                  >
                    {time}
                  </button>
                ))}

                {!availableTimes.length && (
                  <p className="text-gray-500 col-span-4 text-center">
                    Select a date to view available time slots.
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handlePayment}
              disabled={!isFormValid()}
              className={`w-full mt-6 py-4 rounded-lg font-semibold ${
                isFormValid()
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Schedule Your Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;
