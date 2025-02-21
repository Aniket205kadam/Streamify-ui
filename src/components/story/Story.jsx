import React, { useEffect, useRef, useState } from "react";
import Like from "../icons/Like";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeXmark,
  faPlay,
  faCirclePause,
  faEllipsis,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Story.scss";
import { useConvertTime } from "../../hooks/useConvertTime";

function Story({ userStories, isAudio, setIsAudio }) {
  console.log("username: " + userStories[0].user.username);
  const [stories, setStories] = useState([]);
  const [storyIdx, setStoryIdx] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [currStoryTime, setCurrStoryTime] = useState();
  const [loading, setLoading] = useState(true);
  const currContentRef = useRef(null);

  const handlePlayPause = () => {
    if (currContentRef.current) {
      if (currContentRef.current.paused) {
        currContentRef.current.play();
        setIsPause(false);
      } else {
        currContentRef.current.pause();
        setIsPause(true);
      }
    }
  };

  const scrollLeft = () => {
    setStoryIdx((prevStoryIdx) => Math.max(prevStoryIdx - 1, 0));
  };

  const scrollRight = () => {
    setStoryIdx((prevStoryIdx) => Math.min(prevStoryIdx + 1, stories.length - 1));
  };

  useEffect(() => {
    if (!loading) {
      const time = useConvertTime(stories[storyIdx].createdAt);
      setCurrStoryTime(time);
    }
  }, [storyIdx, stories]);

  useEffect(() => {
    setStoryIdx(0);
    setStories(userStories);
    setLoading(false)
  }, [userStories]);

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  } else {
    return (
      <div className="story-container">
        <div className="story-main">
          <div className="story-header">
            <div className="user-info">
              <img
                src={stories[storyIdx].user.profileUrl}
                alt={`${stories[storyIdx].user.username} profile`}
              />
              <span className="username">
                {stories[storyIdx].user.username}
              </span>
              <span className="timestamp">{currStoryTime}</span>
            </div>
            <div className="actions">
              <div className="audio" onClick={() => setIsAudio(!isAudio)}>
                <FontAwesomeIcon
                  icon={isAudio ? faVolumeHigh : faVolumeXmark}
                />
              </div>
              <div className="play-pause" onClick={handlePlayPause}>
                <FontAwesomeIcon icon={isPause ? faCirclePause : faPlay} />
              </div>
              <div className="more">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
          </div>

          <div className="story-content">
            {stories.length > 0 && storyIdx != 0 && (
              <div className="left" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </div>
            )}
            {stories[storyIdx].type.startsWith("image/") ? (
              <img
                src={stories[storyIdx].url}
                alt={stories[storyIdx].user.username + " story"}
              />
            ) : (
              <video
                ref={currContentRef}
                src={stories[storyIdx].url}
                autoPlay
                loop
                muted={!isAudio}
              />
            )}
            {stories.length > 0 && storyIdx != stories.length - 1 && (
              <div className="right" onClick={scrollRight}>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            )}
          </div>

          <div className="story-footer">
            <input
              type="text"
              placeholder={`Reply to ${stories[storyIdx].user.username}`}
            />
            <Like />
          </div>
        </div>
      </div>
    );
  }
}

export default Story;
