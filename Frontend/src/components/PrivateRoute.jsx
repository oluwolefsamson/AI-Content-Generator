import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component to handle access control
const PrivateRoute = ({ children }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Check for token in localStorage
  };

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
