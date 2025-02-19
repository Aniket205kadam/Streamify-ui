import React, { useState } from "react";
import Like from "../icons/Like";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeHigh,
  faVolumeXmark,
  faPlay,
  faCirclePause,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import "./Story.scss"

function Story({ username }) {
  // using this username we can retive all the story of this user
  const feakStories = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      type: "image/",
      user: {
        id: "101",
        username: "john_doe",
        profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      createdAt: "2025-02-19T10:00:00Z",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1511763368359-4f839f49dd34",
      type: "image/",
      user: {
        id: "101",
        username: "john_doe",
        profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      createdAt: "2025-02-19T12:30:00Z",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1558981403-c5f9899a28b1",
      type: "image/",
      user: {
        id: "101",
        username: "john_doe",
        profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      createdAt: "2025-02-18T18:45:00Z",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1563201515-1ec7a7d29a6e",
      type: "image/",
      user: {
        id: "101",
        username: "john_doe",
        profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      createdAt: "2025-02-17T09:15:00Z",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1533745848184-0dfaf2f4cd9c",
      type: "image/",
      user: {
        id: "101",
        username: "john_doe",
        profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      createdAt: "2025-02-16T22:00:00Z",
    },
  ];

  const [stories, setStories] = useState(feakStories);
  const [storyIdx, setStortIdx] = useState(0);

  return (
    <div className="story-container">
        <div className="main">
          <div className="header">
            <div className="user-info">
              <img
                src={stories[0].user.profileUrl}
                alt={stories[0].user.username + " profile"}
              />
              <span>{stories[0].user.username}</span>
              <span>{stories[0].createdAt}</span>
            </div>
            <div className="actions">
              <div className="audio">
                <FontAwesomeIcon icon={faVolumeHigh} />
                {/* <FontAwesomeIcon icon={faVolumeXmark} /> */}
              </div>
              <div className="play-pause">
                <FontAwesomeIcon icon={faPlay} />
                {/* <FontAwesomeIcon icon={faCirclePause} /> */}
              </div>
              <div className="more">
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
            <div className="content">
                {stories[storyIdx].type.startsWith("image/") ?
                <img src={stories[storyIdx].url} />
                :
                <video src={stories[storyIdx].url} />
                }
            </div>
            <div className="footer">
              <input
                type="text"
                placeholder={`Reply to ${stories[0].user.username}`}
              />
              <Like />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Story;
