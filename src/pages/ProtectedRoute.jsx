import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, authentication }) {
  const currentUser = true;

  // if user not login then show the other pages
  if (authentication && !currentUser) {
    return <Navigate to="/login" />;
  }

  // if user login then not show the login and register page
  if (!authentication && currentUser) {
    return <Navigate to="/" />
  }
  return children;
}

export default ProtectedRoute;
