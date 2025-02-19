import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./VerificationPage.scss";

function VerificationPage({ email }) {
  return (
    <div className="verification">
      <div className="header">
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
        </div>
        <h4>Enter Confirmation Code</h4>
        <p>Enter the confirmation code we sent to {email}.</p>
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
          <input placeholder="Cofirmation Code" maxlength="6" type="tel" />
        </div>
        <button>Verify</button>
      </div>
    </div>
  );
}

export default VerificationPage;
