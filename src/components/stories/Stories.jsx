import React, { useRef } from "react";
import "./Stories.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Stories({ showAddStoryBox }) {
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

  const connectedUser = {
    username: "aniket205kadam",
    profileUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  };

  const stories = [
    {
      id: "1",
      username: "john_doe",
      profileUrl:
        "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: false,
    },
    {
      id: "2",
      username: "emma_smith",
      profileUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: true,
    },
    {
      id: "3",
      username: "michael_jordan",
      profileUrl:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: false,
    },
    {
      id: "4",
      username: "sophia_wilson",
      profileUrl:
        "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: true,
    },
    {
      id: "5",
      username: "david_brown",
      profileUrl:
        "https://images.pexels.com/photos/2589650/pexels-photo-2589650.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: false,
    },
    {
      id: "6",
      username: "lisa_miller",
      profileUrl:
        "https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: false,
    },
    {
      id: "7",
      username: "mark_white",
      profileUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      allStoriesSeen: true,
    },
  ];

  // const addStory = () => {
  //   alert("This is upcomming feature");
  // }

  return (
    <div className="stories-container">
      {stories.length > 6 && (
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      <div className="stories" ref={storiesRef}>
        <div className="user-story">
          <img
            src={connectedUser.profileUrl}
            alt={connectedUser.username + "profile"}
            onClick={() => navigate(`/stories/${connectedUser.username}`)}
          />
          <span>{connectedUser.username}</span>
          <button className="add-story-btn" onClick={showAddStoryBox}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {stories.map((story) => (
          <Link
            to={`stories/${story.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className={`story ${story.allStoriesSeen ? "seen" : ""}`}
              key={story.id}
            >
              <div className="profile-border">
                <img src={story.profileUrl} alt={`${story.username} profile`} />
              </div>
              <span>{story.username}</span>
            </div>
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
