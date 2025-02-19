import React from "react";
import "./BirthDate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";

function BirthDate() {
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
          <input type="date" />
          <p>You need to enter the date you were born</p>
          <br />
          <p>
            Use your own birthday, even if this account is for a business, a
            pet, or something else
          </p>
          <button onClick={() => {}}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default BirthDate;
