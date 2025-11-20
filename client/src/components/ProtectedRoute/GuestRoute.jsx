import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If user is logged in → redirect to dashboard
  if (token && user) {
    if (user.role === "patient") {
      return <Navigate to="/patient/dashboard" replace />;
    }
    if (user.role === "doctor") {
      return <Navigate to="/doctor/dashboard" replace />;
    }
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children; //  If not logged in → show Login/Register page
};

export default GuestRoute;
