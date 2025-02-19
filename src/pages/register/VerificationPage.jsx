import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./VerificationPage.scss";
import { useSelector } from "react-redux";
import authenticationService from "../../services/authenticationService";
import ShowInfoBanner from "../../components/popups/ShowInfoBanner";
import { useNavigate } from "react-router-dom";

function VerificationPage() {
  const { username, identifier } = useSelector((state) => state.authentication);
  const [verificationCode, setVerificationCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

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

  const verifiyHandler = async () => {
    if (!verificationCode || verificationCode.length != 6) return;
    const { success, status, error } =
      await authenticationService.accountVerification(
        username,
        verificationCode
      );
    if (!success) {
      console.error(`Error: ${error} : ${status}`);
      setError(error);
      return;
    }
    setShowSuccess(true);
    setTimeout(() => navigate("/login"), 5000);
  };

  return (
    <div className="verification">
      {showSuccess && (
        <ShowInfoBanner
          msg={
            "🎉 Registration successful! Welcome aboard! 🚀 You can now log in to your account and start exploring amazing posts. Happy scrolling! 😊"
          }
          success
        />
      )}
      <div className="header">
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
        </div>
        <h4>Enter Confirmation Code</h4>
        <p>Enter the confirmation code we sent to {identifier}.</p>
        <span
          onClick={() => {
            console.log("new opt send");
          }}
        >
          Resend Code.
        </span>
      </div>
      <div className="main">
        <div className="input-wrapper">
          <input
            placeholder="Cofirmation Code"
            maxLength="6"
            type="tel"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          />
        </div>
        <button onClick={verifiyHandler}>Verify</button>
      </div>
    </div>
  );
}

export default VerificationPage;
