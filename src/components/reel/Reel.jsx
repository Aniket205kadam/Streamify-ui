import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faBookmark,
  faEllipsis,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import "./Reel.scss";
import ReadMoreCaption from "../post/ReadMoreCaption";
import Like from "../icons/Like";
import Save from "../icons/Save";

const Reel = ({ reel, handleNext, handlePrev }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef(null);

  const playOrPauseVideo = () => {
    if (videoRef.current.paused) {
      setIsVideoPaused(false);
      videoRef.current.play();
    } else {
      setIsVideoPaused(true);
      videoRef.current.pause();
    }
  };

  const muteOrUnmuteVideo = (event) => {
    event.stopPropagation();
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
    } else if (!videoRef.current.muted) {
      videoRef.current.muted = true;
    }
    setIsVideoMuted((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        handleNext();
      } else if (event.key === "ArrowUp") {
        handlePrev();
      } else if (
        event.key === " " ||
        event.key === "Spacebar" ||
        event.code === "Space"
      ) {
        console.log("Clicked spacebar");
        playOrPauseVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  return (
    <div className="reel">
      <div className="content" onClick={playOrPauseVideo}>
        {isVideoPaused && (
          <span>
            <FontAwesomeIcon icon={faPause} />
          </span>
        )}
        <div className="audio" onClick={muteOrUnmuteVideo}>
          {isVideoMuted ? (
            <FontAwesomeIcon icon={faVolumeXmark} />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} />
          )}
        </div>

        <video
          key={reel.postMedia.id}
          src={reel.postMedia.mediaUrl}
          autoPlay
          onEnded={handleNext}
          muted={isVideoMuted}
          ref={videoRef}
        />
      </div>
      <div className="actions">
        <div className="item">
          <Like />
          <span>{reel.likes}</span>
        </div>
        <div className="item">
          <FontAwesomeIcon icon={faComment} />
          <span>{reel.commentCount}</span>
        </div>
        <div className="item">
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <div className="item">
          <Save />
        </div>
        <div className="item">
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <div className="details">
        <div className="user-info">
          <div className="profile">
            <img
              src={reel.user.profileUrl}
              alt={reel.user.username + " profile"}
              className="profile-pic"
            />
          </div>
          <div className="username">
            <span>{reel.user.username}</span>
            <button className="follow-btn">Follow</button>
          </div>
        </div>
        <div className="caption">
          <ReadMoreCaption paragraph={reel.caption} />
        </div>
      </div>
    </div>
  );
};

export default Reel;

// Since reel changes frequently, useEffect re-runs, removing and re-adding the event
// listener repeatedly. This can cause the listener to be removed before it executes,
// breaking the key press detection. Instead, use useRef to store reel without triggering
// re-renders or depend on stable functions like handleNext and handlePrev.
