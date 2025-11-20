import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const CurrentUserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/users/currentuser");
   
      
      setUser(res.data); 
      
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        Unable to fetch user details.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        My Profile
      </h2>

      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-semibold">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h3 className="text-lg font-semibold mt-3">{user.username}</h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Full Name:</span>
          <span className="font-medium">{user.username}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Email:</span>
          <span className="font-medium">{user.email}</span>
        </div>



        <div className="flex justify-between">
          <span className="text-gray-500">Joined:</span>
          <span className="font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserDetails;
