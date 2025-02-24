import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeXmark,
  faCirclePause,
  faPlay,
  faEllipsis,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./OwnStories.scss";
import "../story/Story.scss";
import { useConvertTime } from "../../hooks/useConvertTime";
import { useNavigate } from "react-router-dom";

function OwnStories() {
  const stories = [
    {
      id: "1",
      url: "https://videos.pexels.com/video-files/5834605/5834605-sd_360_640_25fps.mp4",
      type: "video/",
      user: {
        id: "101",
        username: "alice_wonder",
        profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      replies: [
        {
          id: "asoasalsl",
          user: {
            id: "2172",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test4",
          },
          content: "story is great",
          createdAt: "2025-02-20T10:00:00Z",
        },
        {
          id: "askasajns",
          user: {
            id: "1212",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test5",
          },
          content: "wow!",
          createdAt: "2025-02-20T12:00:00Z",
        },
      ],
      viewers: [
        {
          id: "v1",
          user: {
            id: "2172",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test4",
          },
          createdAt: "2025-02-20T10:00:00Z",
        },
        {
          id: "v2",
          user: {
            id: "1212",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test5",
          },
          createdAt: "2025-02-20T12:00:00Z",
        },
      ],
      likes: [
        {
          id: "l1",
          user: {
            id: "2172",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test4",
          },
          createdAt: "2025-02-20T10:00:00Z",
        },
        {
          id: "l2",
          user: {
            id: "1212",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test5",
          },
          createdAt: "2025-02-20T12:00:00Z",
        },
      ],
      createdAt: "2025-02-19T10:00:00Z",
    },
    {
      id: "2",
      url: "https://videos.pexels.com/video-files/7010708/7010708-sd_360_640_30fps.mp4",
      type: "video/",
      user: {
        id: "101",
        username: "alice_wonder",
        profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      replies: [
        {
          id: "qwquwqwn",
          user: {
            id: "2172",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test4",
          },
          content: "story is great",
          createdAt: "2025-02-20T10:00:00Z",
        },
        {
          id: "asdjdinoas",
          user: {
            id: "1212",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test5",
          },
          content: "wow!",
          createdAt: "2025-02-20T12:00:00Z",
        },
      ],
      viewers: [
        {
          id: "v3",
          user: {
            id: "2172",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test4",
          },
          createdAt: "2025-02-20T10:00:00Z",
        },
        {
          id: "v4",
          user: {
            id: "1212",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test5",
          },
          createdAt: "2025-02-20T12:00:00Z",
        },
      ],
      likes: [
        {
          id: "l3",
          user: {
            id: "2172",
            profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
            username: "test4",
          },
          createdAt: "2025-02-20T10:00:00Z",
        },
      ],
      createdAt: "2025-02-20T11:00:00Z",
    },
  ];

  const [isAudio, setIsAudio] = useState(false);
  const [showViewers, setShowViewers] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [currStoryIdx, setCurrStoryIdx] = useState(0);
  const [viewerPage, setViewerPage] = useState(0);
  const [likesPage, setLikesPage] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="own-stories-container">
      <div className="left">
        <Story
          userStories={stories}
          currStoryIdx={currStoryIdx}
          setCurrStoryIdx={setCurrStoryIdx}
          isAudio={isAudio}
          setIsAudio={setIsAudio}
        />
      </div>
      <div className="right">
        <div className="close-page">
          <button onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="story-interactions">
          <div className="interaction-section replies-section">
            <h3>Replies</h3>
            <div className="replies-list">
              {stories[currStoryIdx].replies.map((reply) => (
                <div className="reply-item" key={reply.id}>
                  <div className="user-info">
                    <img
                      src={reply.user.profileUrl}
                      alt={reply.user.username + " profile"}
                      className="user-avatar"
                    />
                    <span className="username">{reply.user.username}</span>
                  </div>
                  <p className="reply-content">{reply.content}</p>
                  <span className="reply-time">
                    {useConvertTime(reply.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="interaction-section likes-section"
            onClick={() => setShowLikes((prev) => !prev)}
          >
            <h3>Likes</h3>
            <div className="interaction-count">
              {stories[currStoryIdx].likes.length} Likes
            </div>
            {showLikes && (
              <div className="users-list">
                {stories[currStoryIdx].likes.map((like) => (
                  <div className="user-item" key={like.id}>
                    <img
                      src={like.user.profileUrl}
                      alt={like.user.username + " profile"}
                      className="user-avatar"
                    />
                    <div className="user-details">
                      <span className="username">{like.user.username}</span>
                      <span className="time">
                        {useConvertTime(like.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  className="show-more-btn"
                  onClick={() => setLikesPage((prevPage) => prevPage + 1)}
                >
                  show more
                </button>
              </div>
            )}
          </div>

          <div
            className="interaction-section viewers-section"
            onClick={() => setShowViewers((prev) => !prev)}
          >
            <h3>Viewers</h3>
            <div className="interaction-count">
              {stories[currStoryIdx].viewers.length} Views
            </div>
            {showViewers && (
              <div className="users-list">
                {stories[currStoryIdx].viewers.map((viewer) => (
                  <div className="user-item" key={viewer.id}>
                    <img
                      src={viewer.user.profileUrl}
                      alt={viewer.user.username + " profile"}
                      className="user-avatar"
                    />
                    <div className="user-details">
                      <span className="username">{viewer.user.username}</span>
                      <span className="time">
                        {useConvertTime(viewer.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  className="show-more-btn"
                  onClick={() => setViewerPage((prevPage) => prevPage + 1)}
                >
                  show more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Story = ({
  userStories,
  currStoryIdx,
  setCurrStoryIdx,
  isAudio,
  setIsAudio,
}) => {
  const [isPause, setIsPause] = useState(false);
  const [currStoryTime, setCurrStoryTime] = useState("");
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
    setCurrStoryIdx((prevStoryIdx) => Math.max(prevStoryIdx - 1, 0));
  };

  const scrollRight = () => {
    setCurrStoryIdx((prevStoryIdx) =>
      Math.min(prevStoryIdx + 1, userStories.length - 1)
    );
  };

  useEffect(() => {
    if (userStories.length > 0) {
      const time = useConvertTime(userStories[currStoryIdx].createdAt);
      setCurrStoryTime(time);
    }
  }, [currStoryIdx, userStories]);

  return (
    <div className="story-container">
      <div className="story-main">
        <div className="story-header">
          <div className="user-info">
            <img
              src={userStories[currStoryIdx].user.profileUrl}
              alt={`${userStories[currStoryIdx].user.username} profile`}
            />
            <span className="username">
              {userStories[currStoryIdx].user.username}
            </span>
            <span className="timestamp">{currStoryTime}</span>
          </div>
          <div className="actions">
            <div className="audio" onClick={() => setIsAudio(!isAudio)}>
              <FontAwesomeIcon icon={isAudio ? faVolumeHigh : faVolumeXmark} />
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
          {userStories.length > 0 && currStoryIdx !== 0 && (
            <div className="left" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          {userStories[currStoryIdx].type.startsWith("image/") ? (
            <img
              src={userStories[currStoryIdx].url}
              alt={userStories[currStoryIdx].user.username + " story"}
            />
          ) : (
            <video
              ref={currContentRef}
              src={userStories[currStoryIdx].url}
              autoPlay
              loop
              muted={!isAudio}
            />
          )}
          {userStories.length > 0 &&
            currStoryIdx !== userStories.length - 1 && (
              <div className="right" onClick={scrollRight}>
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OwnStories;
