import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authenticationService from "../../services/authenticationService";
import { login } from "../../store/authenticationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/logo-transparent.png";
import StartAppLoading from "../../components/popups/StartAppLoading";

function Login() {
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const identifier = useSelector((state) => state.authentication.identifier);
  const [isLoaingOpen, setIsLoadingOpen] = useState(true);
  const [flag, setflag] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoadingOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, []);

  const loginHandler = async (data) => {
    setError(false);
    const { success, status, response, error } =
      await authenticationService.login(data);
    if (!success) {
      console.error(`Error: ${error} : ${status}`);
      setError(error);
      return;
    }
    console.log(response);
    dispatch(
      login({
        username: response.username,
        identifier: identifier,
        authToken: response.token,
        profileUrl:
          response.profileUrl ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        isAuthenticated: true,
      })
    );
  };

  return (
    <div className={`login theme-${theme}`}>
      {/* {isLoaingOpen && <StartAppLoading />} */}
      <div className="left">
        <video autoPlay loop muted className="video-background">
          <source
            src="https://hrcdn.net/fcore/assets/onboarding/globe-5fdfa9a0f4.mp4"
            type="video/mp4"
          />
        </video>

        <div className="content-overlay">
          <div className="welcome-msg">
            <div className="logo">
              <img src={logo} alt="Streamify" />
            </div>
            <span className="welcome-text">Welcome to</span>
            <span className="app-name">Streamify</span>
            <p className="motivation-line">
              Login to your account
              <br />
              It's great to have you here again. Ready to explore and connect?
            </p>
          </div>
        </div>
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
        <div className="social-login">
          <div className="social-login-label">
            <span className="label-text">or</span>
          </div>
          <div className="social-btn">
            <button type="button" className="facebook-btn">
              <div className="content">
                <FontAwesomeIcon icon={faFacebook} color="#027efa" size="2xl" />
                <span>Continue with Facebook</span>
              </div>
            </button>
          </div>
        </div>
        <div className="register-option">
          <span>Don't have an account?</span>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
