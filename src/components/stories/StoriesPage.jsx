import React, { useEffect, useState } from "react";
import "./StoriesPage.scss";
import Story from "../story/Story";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function StoriesPage() {
  const feakStories = [
    [
      {
        id: "1",
        url: "https://videos.pexels.com/video-files/5834605/5834605-sd_360_640_25fps.mp4",
        type: "video/",
        user: {
          id: "101",
          username: "alice_wonder",
          profileUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        },
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
        createdAt: "2025-02-20T11:00:00Z",
      },
    ],
    [
      {
        id: "3",
        url: "https://images.pexels.com/photos/30818958/pexels-photo-30818958/free-photo-of-close-up-portrait-of-a-tabby-cat-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "image/",
        user: {
          id: "102",
          username: "bob_marley",
          profileUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        createdAt: "2025-02-19T10:00:00Z",
      },
      {
        id: "4",
        url: "https://videos.pexels.com/video-files/5834605/5834605-sd_360_640_25fps.mp4",
        type: "video/",
        user: {
          id: "102",
          username: "bob_marley",
          profileUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        createdAt: "2025-02-20T11:00:00Z",
      },
    ],
    [
      {
        id: "5",
        url: "https://images.pexels.com/photos/30818958/pexels-photo-30818958/free-photo-of-close-up-portrait-of-a-tabby-cat-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "image/",
        user: {
          id: "103",
          username: "charlie_chaplin",
          profileUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        createdAt: "2025-02-19T10:00:00Z",
      },
    ],
    [
      {
        id: "6",
        url: "https://videos.pexels.com/video-files/7010708/7010708-sd_360_640_30fps.mp4",
        type: "video/",
        user: {
          id: "104",
          username: "diana_prince",
          profileUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        createdAt: "2025-02-19T10:00:00Z",
      },
      {
        id: "7",
        url: "https://images.pexels.com/photos/30818958/pexels-photo-30818958/free-photo-of-close-up-portrait-of-a-tabby-cat-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "image/",
        user: {
          id: "104",
          username: "diana_prince",
          profileUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        createdAt: "2025-02-20T11:00:00Z",
      },
    ],
  ];
  console.log(feakStories);
  const [stories, setStories] = useState(feakStories);
  const [currStoryIdx, setCurrStoryIdx] = useState(0);
//   const [nextStoryIdx, setNextStoryIdx] = useState(1);
  const [isAudio, setIsAudio] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStories(feakStories);
    setCurrStoryIdx(0);
    // setNextStoryIdx(1);
    setLoading(false);
  }, []);

  const handleClose = () => {
    // close page
  };
  const handlePrevStory = () => {
    // if (currStoryIdx != 0)
    setCurrStoryIdx((prevStoryIdx) => prevStoryIdx - 1);
  };
  const handleNextStory = () => {
    // if (currStoryIdx != (stories.length-1))
    setCurrStoryIdx((prevStoryIdx) => prevStoryIdx + 1);
  };


  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="stories-container">
        <div className="close-page">
          <button onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {currStoryIdx > 0 && (
          <div className="left" onClick={handlePrevStory}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        )}

        <div className="display-story">
          <Story
            userStories={stories[currStoryIdx]}
            isAudio={isAudio}
            setIsAudio={setIsAudio}
          />
        </div>

        {currStoryIdx !== stories?.length - 1 && (
          <div className="right" onClick={handleNextStory}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
      </div>
    );
  }
}

export default StoriesPage;
