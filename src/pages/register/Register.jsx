import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import Crowed from "../../components/3D-componets/crowed";
import { useSelector } from "react-redux";

function Register() {
  const theme = useSelector((state) => state.theme.theme);

  // check the all details in db
  const [isValidData, setIsValidData] = useState(false);

  return (
    <div className={`theme-${theme}`}>
      <div className="register">
        <div className="card">
          <div className="left">
            <Crowed />
          </div>
          <div className="right">
            <h1 className="streamify-logo" style={{ fontSize: "48px" }}>
              Stremify
            </h1>
            <p>Sign up to see photos and videos from your friends.</p>
            <form>
              <input type="text" placeholder="Mobile Number or Email" />
              <input type="password" placeholder="password" />
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Username" />
              <button
                className={`${isValidData ? "" : "disabled"}`}
                disabled={!isValidData}
              >
                Sign up
              </button>
            </form>
            <div className="login-option">
              <span>Have an account?</span>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
