import React, { useState, useEffect } from "react";
import "./BirthDate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import ButtonLoading from "../../components/icons/ButtonLoading";
import authenticationService from "../../services/authenticationService";
import { useSelector } from "react-redux";

function BirthDate() {
  // const { username } = useParams();
  const username = useSelector((state) => state.authentication.username);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  console.log(username)

  useEffect(() => {
    if (username.trim().length === 0) return;
    (async function isUsernameExists() {
      const { success, status, data, error } =
        await authenticationService.isExistUsername(username);
      if (!success) {
        console.error(`Error: ${error} : ${status}`);
        setError(error);
        return;
      }
    })();
  }, [username]);

  const birthDateHandler = async () => {
    if (!dateOfBirth) return;
    setLoading(true);
    setError(false);
    const { success, data, error } = await authenticationService.enterBirthDate(
      username,
      dateOfBirth
    );
    if (!success) {
      setError(error);
      return;
    }
    navigate("/account/verify-otp")
  };

  return (
    <div className="container-wrapper">
      <div className="container">
        <div className="header">
          <div className="icons">
            <FontAwesomeIcon icon={faCakeCandles} rotation={20} />
          </div>
          <div className="info">
            <p>This won't be a part of your public profile</p>
            <span onClick={() => {}}>
              Why do I need to provide my birthday?
            </span>
          </div>
        </div>
        <div className="main">
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
          <p>You need to enter the date you were born</p>
          <br />
          <p>
            Use your own birthday, even if this account is for a business, a
            pet, or something else
          </p>
          <button
            className={`${dateOfBirth ? "" : "disabled"}`}
            onClick={birthDateHandler}
          >
            {!loading && <span>Next</span>}
            {loading && <ButtonLoading />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BirthDate;
