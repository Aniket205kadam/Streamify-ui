import React from "react";
import "./ShowInfoBanner.scss";

function ShowInfoBanner({ msg, success }) {
  if (!msg) return;
  return (
    <div id="info-banner" className={`${success ? "success" : "failed"}`}>
      <p>{msg}</p>
    </div>
  );
}

export default ShowInfoBanner;
