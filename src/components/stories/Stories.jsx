import React, { useEffect, useRef, useState } from "react";
import "./Stories.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useConnectedUser from "../../hooks/useConnectedUser";
import storyService from "../../services/storyService";
import userService from "../../services/userService";
import { toast } from "react-toastify";

function Stories({ showAddStoryBox }) {
  const connectedUser = useConnectedUser();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectedUserHasStory, setConnectedUserHasStory] = useState(false);
  const [usersProfiles, setUsersProfiles] = useState({});
  const storiesRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (storiesRef.current) {
      storiesRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    (async () => {
      const { success, error, data } =
        await storyService.isConnectedUserHasStory(connectedUser.authToken);
      if (!success) {
        toast.error(error);
        return;
      }
      console.log("Userhas story: " + data === "true")
      console.log("Userhas story: " + typeof data)
      setConnectedUserHasStory(data === "true");
    })();
  }, [connectedUser.authToken]);

  useEffect(() => {
    (async () => {
      const storiesResponse = await storyService.getFollowingsStories(
        connectedUser.authToken
      );
      if (!storiesResponse.success) {
        toast.error(storiesResponse.error);
        return;
      }
      setStories(storiesResponse.data);
      setLoading(false);
    })();
  }, [connectedUser.authToken]);

  useEffect(() => {
    if (stories.length > 0) {
      const fetchProfiles = async () => {
        const profiles = {};
        for (const story of stories) {
          try {
            const userResponse = await userService.getUserProfileByUsername(
              story.username,
              connectedUser.authToken
            );
            if (userResponse.success) {
              profiles[story.username] = URL.createObjectURL(userResponse.data);
            }
          } catch (error) {
            toast.error("Failed to fetch user profile.");
          }
        }
        setUsersProfiles(profiles);
      };
      fetchProfiles();
    }
  }, [stories, connectedUser.authToken]);

  return (
    <div>
      {stories.length > 6 && (
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      <div className="stories" ref={storiesRef}>
        <div className={`user-story ${connectedUserHasStory ? "has-story" : ""}`}>
          <div className="story-circle">
            <img
              src={connectedUser.profileUrl}
              alt={connectedUser.username}
              onClick={() => navigate(`/my-stories`)}
            />
            <button className="add-story-btn" onClick={showAddStoryBox}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <span>{connectedUser.username}</span>
        </div>

        {!loading && stories.map((story) => (
          <Link
            key={story.id}
            to={`/stories/${story.username}`}
            className="story-item"
          >
            <div className={`story-circle ${story.allStoriesSeen ? "seen" : ""}`}>
              <img
                src={usersProfiles[story.username] || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt={story.username}
              />
            </div>
            <span>{story.username}</span>
          </Link>
        ))}
      </div>

      {stories.length > 6 && (
        <button className="scroll-btn right" onClick={scrollRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
}

export default Stories;