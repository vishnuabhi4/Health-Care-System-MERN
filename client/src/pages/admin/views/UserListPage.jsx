import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios.js";

const UsersList = ({ setCurrentView, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosInstance.get("/users/userlist");
        if (Array.isArray(data)) setUsers(data); //If tried to run .map() on
        // something that isn’t an array, your app would crash.
        else setUsers([]);
        console.log("data from patient", data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className="p-4 space-y-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
          onClick={() => {
            setSelectedUser(user); // store clicked user in state
            if (!user.details) {
              setCurrentView("CreatePatientDetails");
            } else {
              setCurrentView("UserDetails");
            }
          }}
        >
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Active:</strong> {user.isActive ? "Yes" : "No"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
