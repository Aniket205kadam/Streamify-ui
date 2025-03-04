import React, { useRef } from "react";
import "./PostInfo.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

function PostInfo({ isFollowingPost, isFavorites, closeOptions, postId }) {
  const optionsRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(optionsRef, () => closeOptions(false));

  return (
    <div className="options-wrapper" ref={optionsRef}>
      <div className="options">
        <div className="option">
          <span className="warn">Report</span>
        </div>
        {isFollowingPost ? (
          <div className="option">
            <span className="warn">Unfollow</span>
          </div>
        ) : (
          <div className="option">
            <span>Not Interested</span>
          </div>
        )}
        {isFavorites ? (
          <div className="option">
            <span>Remove from favorites</span>
          </div>
        ) : (
          <div className="option">
            <span>Add to favorites</span>
          </div>
        )}
        <div className="option" onClick={() => navigate(`/post/${postId}`)}>
          <span>Go to post</span>
        </div>
        <div className="option">
          <span>Copy link</span>
        </div>
        <div className="option">
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
    </div>
  );
}

export default PostInfo;
