import React from "react";
import "./SearchLoader.scss";

function SearchLoader({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-container" key={i}>
          <div className="skeleton-profile"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
          </div>
          <div className="skeleton-dot"></div>
        </div>
      ))}
    </>
  );
  
}

export default SearchLoader;
