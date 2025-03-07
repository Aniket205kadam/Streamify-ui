import React, { useRef } from "react";
import "./PostInfo.scss";
import useClickOutside from "../../hooks/useClickOutside";

function StoryInfo({ isStoryOwner, closeOptions, showAboutAccount }) {
  const optionsRef = useRef(null);
  useClickOutside(optionsRef, () => closeOptions(false));

  return (
    <div className="options-wrapper">
      {!isStoryOwner && (
        <div className="options" ref={optionsRef}>
          <div className="option">
            <span className="warn">Report inappropriate</span>
          </div>
          <div
            className="option"
            onClick={() => {
              showAboutAccount(true);
              closeOptions(false);
            }}
          >
            <span>About this account</span>
          </div>
          <div
            className="option"
            onClick={(event) => {
              event.preventDefault();
              closeOptions(false);
            }}
          >
            <span>Cancel</span>
          </div>
        </div>
      )}
      {isStoryOwner && (
        <div className="options" ref={optionsRef}>
          <div className="option">
            <span>Add to Highlights</span>
          </div>
          <div className="option">
            <span className="warn">Delete</span>
          </div>
          <div
            className="option"
            onClick={(event) => {
              event.preventDefault();
              closeOptions(false);
            }}
          >
            <span>Cancel</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryInfo;
