import React from "react";

const UserDetails = ({ user, setCurrentView }) => {
  if (!user) return <p>User not found.</p>;

  return (
   <div className="p-6 space-y-6">

  {/* Back Button */}
  <button
    onClick={() => setCurrentView("UserList")}
    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
  >
    <span className="text-lg">←</span> Back to Users
  </button>

  {/* User Header Card */}
  <div className="bg-white shadow-md rounded-xl p-6 border">
    <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <p><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
      <p><span className="font-semibold text-gray-700">Role:</span> {user.role}</p>
      <p><span className="font-semibold text-gray-700">Status:</span> {user.isActive ? "Active" : "Inactive"}</p>
    </div>
  </div>

  {/* User Details Section */}
  {user.details && (
    <div className="bg-gray-50 p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><span className="font-semibold text-gray-700">DOB:</span> {new Date(user.details.dob).toLocaleDateString()}</p>
        <p><span className="font-semibold text-gray-700">Gender:</span> {user.details.gender}</p>
        <p><span className="font-semibold text-gray-700">Address:</span> {user.details.address}</p>
        <p><span className="font-semibold text-gray-700">Phone:</span> {user.details.phone}</p>
      </div>

      {/* Medical History */}
      {user.details.medicalHistory?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Medical History</h3>

          <div className="space-y-3">
            {user.details.medicalHistory.map((history) => (
              <div
                key={history._id}
                className="p-4 border bg-white rounded-lg shadow-sm"
              >
                <p><strong>Illness:</strong> {history.illness}</p>
                <p><strong>Surgery:</strong> {history.surgery}</p>
                <p><strong>Allergy:</strong> {history.allergy}</p>
                <p><strong>Notes:</strong> {history.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
</div>

  );
};

export default UserDetails;
