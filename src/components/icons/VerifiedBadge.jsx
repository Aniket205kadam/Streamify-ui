import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./VerifiedBadge.scss";

function VerifiedBadge() {
  return (
    <div className="verified-badge">
      <FontAwesomeIcon icon={faCertificate} className="badge-bg" />
      <FontAwesomeIcon icon={faCheck} className="badge-check" />
    </div>
  );
}

export default VerifiedBadge;
