import React from "react";
import { Star } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "Dr. Kavya Nair",
    specialty: "Cardiologist",
    experience: "12 years",
    city: "Kochi",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Arjun Menon",
    specialty: "Dermatologist",
    experience: "10 years",
    city: "Bangalore",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialty: "Pediatrician",
    experience: "8 years",
    city: "Mumbai",
    rating: 4.9,
  },
];

const FindDoctor = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Doctor</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="text-xl font-semibold">{doc.name}</div>
            <p className="text-blue-600 font-medium">{doc.specialty}</p>

            <div className="mt-3 text-gray-600">{doc.experience}</div>
            <div className="text-gray-600"> {doc.city}</div>

            <div className="flex items-center mt-2">
              <Star className="text-yellow-400 w-4 h-4" />
              <span className="ml-1 font-medium">{doc.rating}</span>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindDoctor;
