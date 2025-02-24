import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, authentication }) {
  const { isAuthenticated, authToken } = useSelector(
    (state) => state.authentication
  );
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(isAuthenticated);

  useEffect(() => {
    if (!authToken) {
      setIsUserAuthenticated(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(authToken);
      const currTime = Date.now() / 1000;

      if (decodedToken.exp < currTime) {
        setIsUserAuthenticated(false);
      } else {
        setIsUserAuthenticated(true);
      }
    } catch (error) {
      setIsUserAuthenticated(false);
    }
  }, [authToken, isAuthenticated]);

  // Redirect to login if authentication is required but user is not authenticated
  if (authentication && !isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if user is authenticated but tries to access login/register pages
  if (!authentication && isUserAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
