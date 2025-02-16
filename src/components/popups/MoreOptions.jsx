import React from "react";
import "./MoreOptions.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faBookmark,
  faChartLine,
  faBug,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function More({ switcherHandler, ref }) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div class="input" ref={ref}>
      <button class="value">
        <FontAwesomeIcon icon={faGear} />
        Settings
      </button>
      <button class="value">
        <FontAwesomeIcon icon={faChartLine} />
        Your activity
      </button>
      <button class="value">
        <FontAwesomeIcon icon={faBookmark} />
        Saved
      </button>
      <button class="value" onClick={switcherHandler}>
        {theme.toLowerCase() === "dark" ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
        Switch appearance
      </button>
      <button class="value">
        <FontAwesomeIcon icon={faBug} />
        Report a problem
      </button>
      <hr />
      <button class="value">Switch accounts</button>
      <hr />
      <br />
      <button class="value">Log out</button>
    </div>
  );
}

export default More;
