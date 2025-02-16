import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faPlay } from "@fortawesome/free-solid-svg-icons";
import "./ReelIcon.scss"

function ReelIcon() {
  return (
    <div className="reels-icon">
      <FontAwesomeIcon icon={faClapperboard} className="reels-bg" />
      <FontAwesomeIcon icon={faPlay} className="reels-play" />
    </div>
  );
}

export default ReelIcon;
