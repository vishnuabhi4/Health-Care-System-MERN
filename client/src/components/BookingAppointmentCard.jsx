import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentBooking from "./BookingSection";

const BookAppointmentCard = () => {
  const [user, setUser] = useState(null); // mock user, null = not logged in
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {!user ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-3xl mx-auto text-center border">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Book an Appointment
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to book your appointment and save your details securely.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                Sign In to Continue
              </button>
              {/* TEMP: Toggle user for testing */}
              <button
                onClick={() => setUser({ name: "Test User" })}
                className="text-blue-500 underline px-6 py-3 rounded-lg hover:bg-blue-50 transition-all"
              >
                Mock Login (Preview Form)
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <AppointmentBooking />
          </div>
        )}
      </div>
    </section>
  );
};

export default BookAppointmentCard;
