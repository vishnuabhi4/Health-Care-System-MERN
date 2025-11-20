import React from "react";

const labs = [
  {
    id: 1,
    name: "Thyrocare Diagnostics",
    tests: "Blood Test, Thyroid, Diabetes",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "Dr. Lal Path Labs",
    tests: "CBC, Lipid Profile, Kidney Function",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Aster Lab",
    tests: "MRI, CT Scan, X-Ray",
    location: "Kochi",
  },
];

const Lab = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Medical Labs</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white border shadow p-6 rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold">{lab.name}</h2>
            <p className="text-gray-600"> {lab.location}</p>
            <p className="mt-2 text-gray-700">{lab.tests}</p>
            <button className="mt-4 bg-blue-600 w-full text-white py-2 rounded-lg">
              Book Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lab;
