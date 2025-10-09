import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  //children = <PatientDashboard /> (the component nested inside).
  //allowedRoles is passed as a normal prop (["patient"]).
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Role not allowed
    return <Navigate to="/" replace />;
  }

  //  Authorized
  return children;
};

export default ProtectedRoute;
