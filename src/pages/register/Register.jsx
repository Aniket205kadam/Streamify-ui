import React, { useEffect, useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import authenticationService from "../../services/authenticationService";
import { login } from "../../store/authenticationSlice";
import logo from "../../assets/logo-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

function Register() {
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [isUsernameNotExist, setIsUsernameNotExist] = useState(true);
  const [isIdentifierNotExist, setIsIdentifierNotExist] = useState(true);
  const [isValidData, setIsValidData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isUsernameNotExist && isIdentifierNotExist) setIsValidData(true);
  }, [isUsernameNotExist, isIdentifierNotExist]);


  useEffect(() => {
    if (username.trim().length === 0) return;
    (async function isUsernameExists() {
      const { success, status, data, error } =
        await authenticationService.isExistUsername(username);
      if (!success) {
        toast.info(error);
        return;
      }
      setIsUsernameNotExist(data === "true" ? false : true);
    })();
  }, [username]);

  useEffect(() => {
    if (identifier.trim().length === 0) return;
    (async function isIdentifierExists() {
      if (identifier.includes("@")) {
        const { success, status, data, error } =
          await authenticationService.isExistUsername(identifier);
        if (!success) {
          console.error(`Error: ${error} : ${status}`);
          setError(error);
          return;
        }
        setIsIdentifierNotExist(data === "true" ? false : true);
      } else {
        // phone number
        //TODO: implement isPhoneExist() method in authenticationService
      }
    })();
  }, [identifier]);

  useEffect(() => {
    toast.warn(
      "This application is currently in the testing phase, so signing up with a mobile number is not available."
    );
  }, []);

  const registerHandler = async (data) => {
    //TODO: register method implement for the phone number
    const { success, error } = await authenticationService.register({
      fullName: data.fullName,
      email: data.identifier,
      password: data.password,
      username: data.username,
    });
    if (!success) {
      console.log(error);
      if (error.validationErrors) {
        error.validationErrors.forEach((e) => toast.error(e));
      } else {
        toast.error(error);
      }
      return;
    }
    dispatch(
      login({
        id: "",
        username: data.username,
        identifier: data.identifier,
        isAuthenticated: false,
        authToken: "",
      })
    );
    navigate(`/account/verify-birthdate`);
  };

  return (
    <div className={`register theme-${theme}`}>
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
              A vibrant community of creators and viewers.
              <br />
              Join now and dive into an endless stream of content!
            </p>
          </div>
        </div>
      </div>
      <div className="right">
        <h1 className="streamify-logo" style={{ fontSize: "48px" }}>
          Stremify
        </h1>
        <p>Sign up to see photos and videos from your friends.</p>
        <form onSubmit={handleSubmit(registerHandler)}>
          <input
            type="text"
            placeholder="Mobile Number or Email"
            {...register("identifier", {
              required: true,
            })}
            value={identifier}
            onChange={(event) => {
              setIsIdentifierNotExist(false);
              setIsValidData(false);
              event.target.value = event.target.value.replace(/\s/g, "");
              setIdentifier(event.target.value);
            }}
          />
          {!isIdentifierNotExist && (
            <div className="warn">
              <span>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "#fb0909" }}
                />{" "}
                The email you have provided is already associated with an
                account.
              </span>
            </div>
          )}
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
            })}
            onChange={(event) =>
              (event.target.value = event.target.value.replace(/\s/g, ""))
            }
          />
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", {
              required: true,
            })}
          />
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
            })}
            value={username}
            onChange={(event) => {
              setIsUsernameNotExist(false);
              setIsValidData(false);
              event.target.value = event.target.value.replace(/\s/g, "");
              setUsername(event.target.value);
            }}
          />
          {!isUsernameNotExist && (
            <div className="warn">
              <span>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ color: "#fb0909" }}
                />{" "}
                Username {username} is not available
              </span>
            </div>
          )}
          <button
            type="submit"
            className={`${isValidData ? "" : "disabled"}`}
            disabled={!isValidData}
          >
            Sign up
          </button>
        </form>
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
        <div className="login-option">
          <span>Have an account?</span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
