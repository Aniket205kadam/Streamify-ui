import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import Crowed from "../../components/3D-componets/crowed";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authenticationService from "../../services/authenticationService";
import { login } from "../../store/authenticationSlice";

function Login() {
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { username, identifier } = useSelector((state) => state.authentication);

  const loginHandler = async (data) => {
    setError(false);
    const { success, status, response, error } =
      await authenticationService.login(data);
    if (!success) {
      console.error(`Error: ${error} : ${status}`);
      setError(error);
      return;
    }
    console.log(response)
    dispatch(
      login({
        username: username,
        identifier: identifier,
        authToken: response.authToken,
        isAuthenticated: true,
      })
    );
  };

  return (
    <div className={`theme-${theme}`}>
      <div className="login">
        <div className="card">
          <div className="left">
            <Crowed />
          </div>
          <div className="right">
            <h1 className="streamify-logo" style={{ fontSize: "48px" }}>
              Stremify
            </h1>
            <form onSubmit={handleSubmit(loginHandler)}>
              <input
                type="text"
                placeholder="Phone number, username, or email"
                {...register("identifier", { required: true })}
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <button type="submit">
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
