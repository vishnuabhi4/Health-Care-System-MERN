import React from "react";

const hospitals = [
  {
    id: 1,
    name: "Apollo Hospital",
    location: "Chennai",
    beds: 350,
    specialties: "Cardiology, Neurology, Oncology",
  },
  {
    id: 2,
    name: "Fortis Hospital",
    location: "Bangalore",
    beds: 420,
    specialties: "Orthopedics, Emergency, Surgery",
  },
  {
    id: 3,
    name: "Aster Medcity",
    location: "Kochi",
    beds: 500,
    specialties: "Cardiology, Pediatrics",
  },
];

const Hospitals = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Hospitals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hospitals.map((h) => (
          <div key={h.id} className="bg-white p-6 shadow rounded-xl border">
            <h2 className="text-xl font-bold mb-2">{h.name}</h2>
            <p className="text-gray-600 mb-1"> {h.location}</p>
            <p className="text-gray-600">Beds Available: {h.beds}</p>
            <p className="text-gray-700 mt-2">{h.specialties}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospitals;
