import React from "react";
import "./StartAppLoading.scss";
import logo from "../../assets/logo-transparent.png";

function StartAppLoading() {
  return (
    <div className="container-wrapper theme-dark">
  <div className="container">
    <div className="log">
      <img src={logo} alt="Streamify" />
    </div>
    <div className="info">
      <span className="small">from</span>
      <span className="dev">dev.aniket</span>
    </div>
  </div>
</div>
  );
}

export default StartAppLoading;
