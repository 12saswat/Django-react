import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"))?.access;
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected component)
  return children;
};

export default ProtectedRoute;
