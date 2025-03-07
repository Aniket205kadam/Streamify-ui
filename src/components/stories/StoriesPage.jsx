import React, { useEffect, useState } from "react";
import "./StoriesPage.scss";
import Story from "../story/Story";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import storyService from "../../services/storyService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import userService from "../../services/userService";

function StoriesPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [currentUserIdx, setCurrentUserIdx] = useState(0);
  const connectedUser = useConnectedUser();
  const [nextStoriesUsername, setNextStoriesUsername] = useState([username]);
  const [isAudio, setIsAudio] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prevStory, setPrevStory] = useState("");
  const [nextStory, setNextStory] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const storiesResponse = await storyService.getFollowingsStories(
          connectedUser.authToken
        );
        if (!storiesResponse.success) {
          toast.error(storiesResponse.error);
          return;
        }
        const usernames = storiesResponse.data
          .filter((user) => !user.allStoriesSeen)
          .map((user) => user.username);
        setNextStoriesUsername((prev) => [...new Set([...prev, ...usernames])]);
      } catch (error) {
        toast.error("Failed to load stories.");
      } finally {
        setLoading(false);
      }
    })();
  }, [username, connectedUser.authToken]);

  const handleClose = () => {
    navigate('/');
  };

  // generate profile (prev, next)
  const generateSecStory = async (username, prev, next) => {
    const userResposne = await userService.getUserProfileByUsername(
      username,
      connectedUser.authToken
    );
    if (prev && !next) {
      if (!userResposne.success) {
        toast.error("Failed to load previous story!");
        return;
      }
      setPrevStory(URL.createObjectURL(userResposne.data));
    } else if (!prev && next) {
      if (!userResposne.success) {
        toast.error("Failed to load previous story!");
        return;
      }
      setNextStory(URL.createObjectURL(userResposne.data));
    } else {
      toast.error("Somthing is wrong!");
    }
  };

  const handlePrevStory = () => {
    let temp = currentUserIdx;
    navigate(`/stories/${nextStoriesUsername[temp - 1]}`);
    if (temp - 1 >= 0) {
      generateSecStory(nextStoriesUsername[temp - 1], true, false);
    }
    setCurrentUserIdx((prev) => prev - 1);
  };

  const handleNextStory = () => {
    let temp = currentUserIdx;
    navigate(`/stories/${nextStoriesUsername[temp + 1]}`);
    if (temp + 1 > nextStoriesUsername.length) {
      generateSecStory(nextStoriesUsername[temp + 1], false, true);
    }
    setCurrentUserIdx((prev) => prev + 1);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="stories-container">
      <div className="close-page">
        <button onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {currentUserIdx > 0 && (
        <>
          <div className="nav-button left" onClick={handlePrevStory}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="previous-story">
            <img
              src={
                prevStory || "https://media.tenor.com/-n8JvVIqBXkAAAAM/dddd.gif"
              }
            />
            <span>{nextStoriesUsername[currentUserIdx - 1]}</span>
          </div>
        </>
      )}

      <div className="display-story">
        <Story
          username={nextStoriesUsername[currentUserIdx]}
          isAudio={isAudio}
          setIsAudio={setIsAudio}
        />
      </div>

      {currentUserIdx < nextStoriesUsername.length - 1 && (
        <>
          <div className="nav-button right" onClick={handleNextStory}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className="next-story">
            <img
              src={
                nextStory || "https://media.tenor.com/-n8JvVIqBXkAAAAM/dddd.gif"
              }
            />
            <span>{nextStoriesUsername[currentUserIdx + 1]}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default StoriesPage;
