import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, authentication }) {
  // const { userId, username, authToken } = useSelector(
  //   (state) => state.authentication
  // );
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);

  // useEffect(() => {
  //   ;(() => {
  //     try {
  //       const decodedToken = jwtDecode(authToken);
  //       const currTime = Date.now() / 1000;
  //       if (decodedToken.exp < currTime) {
  //         setIsUserAuthenticated(false)
  //         return;
  //       }
  //       setIsUserAuthenticated(true);
  //     } catch (error) {
  //       setIsUserAuthenticated(false);
  //     }
  //   })()
  // }, [userId, username, authToken]);

  // if user not login then show the other pages
  if (authentication && !isUserAuthenticated) {
    return <Navigate to="/login" />;
  }

  // if user login then not show the login and register page
  if (!authentication && isUserAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
