import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import Crowed from "../../components/3D-componets/crowed";
import { useSelector } from "react-redux";

function Login() {
  const theme = useSelector((state) => state.theme.theme);

  const [isFormFilled, setIsFormFilled] = useState(false);

  return (
    <div className={`theme-${theme}`}>
      <div className="login">
        <div className="card">
          <div className="left">
            <Crowed />
          </div>
          <div className="right">
            <h1 className="streamify-logo" style={{fontSize: "48px"}}>Stremify</h1>
            <form>
              <input
                type="text"
                placeholder="Phone number, username, or email"
              />
              <input type="password" placeholder="Password" />
              <button
                className={`${isFormFilled ? "" : "disabled"}`}
                disabled={!isFormFilled}
              >
                <span>Login</span>
              </button>
            </form>
            <div className="forgot-password">
              <span>Forgot password?</span>
            </div>
            <div className="register-option">
              <span>Don't have an account?</span>
              <Link to="/register">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
