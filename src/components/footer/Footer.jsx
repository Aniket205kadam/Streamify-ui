import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="rightBar-footer">
      <p>
        <Link to="#" className="info">
          · About
        </Link>
        <Link to="#" className="info">
          · Help
        </Link>
        <Link to="#" className="info">
          · Press
        </Link>
        <Link to="#" className="info">
          · API
        </Link>
        <Link to="#" className="info">
          · Jobs
        </Link>
        <Link to="#" className="info">
          · Privacy
        </Link>
        <Link to="#" className="info">
          · Terms
        </Link>
        <Link to="#" className="info">
          · Locations
        </Link>
        <Link to="#" className="info">
          · Language
        </Link>
      </p>
      <p>© 2025 STREAMIFY FROM ANIKETKADAM.DEV</p>
    </footer>
  );
}

export default Footer;
