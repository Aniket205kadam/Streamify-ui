import React, { useEffect, useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import Crowed from "../../components/3D-componets/crowed";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import authenticationService from "../../services/authenticationService";
import { login } from "../../store/authenticationSlice";

function Register() {
  const theme = useSelector((state) => state.theme.theme);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [isUsernameNotExist, setIsUsernameNotExist] = useState(false);
  const [isIdentifierNotExist, setIsIdentifierNotExist] = useState(false);
  const [isValidData, setIsValidData] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUsernameNotExist && isIdentifierNotExist) setIsValidData(true);
  }, [isUsernameNotExist, isIdentifierNotExist]);

  useEffect(() => {
    if (username.trim().length === 0) return;
    (async function isUsernameExists() {
      setError(false);
      const { success, status, data, error } =
        await authenticationService.isExistUsername(username);
      if (!success) {
        console.error(`Error: ${error} : ${status}`);
        setError(error);
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

  const registerHandler = async (data) => {
    //TODO: register method implement for the phone number
    const { success, error } = await authenticationService.register({
      fullName: data.fullName,
      email: data.identifier,
      password: data.password,
      username: data.username,
    });
    if (!success) {
      setError(error);
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
                style={
                  isIdentifierNotExist
                    ? { backgroundColor: "#96fa5c" }
                    : { backgroundColor: "#f7777b" }
                }
              />
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
                style={
                  isUsernameNotExist
                    ? { backgroundColor: "#96fa5c" }
                    : { backgroundColor: "#f7777b" }
                }
              />
              <button
                type="submit"
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
