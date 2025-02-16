import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./FollowModal.scss";

function FollowModal({
  ref,
  heading,
  follows,
  user,
  handleClose,
  handleAnotherPage,
  handleSearch,
  isCurrentUserProfile = false,
}) {
  const followRef = useRef(null);
  const [query, setQuery] = useState("");
  const currentUser = { username: "aniket205kadam" };

  // Debounce function to prevent multiple API calls
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  // Optimized infinite scroll handler
  const handleInfiniteScroll = useCallback(() => {
    if (followRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = followRef.current;
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        handleAnotherPage();
      }
    }
  }, [handleAnotherPage]);

  // Debounced search function
  const fetchSearchedUsers = useCallback(
    debounce(() => {
      handleSearch(query);
    }, 500),
    [query]
  );

  // Call search function when query changes
  useEffect(() => {
    if (query) fetchSearchedUsers();
  }, [query, fetchSearchedUsers]);

  // Attach scroll listener if it's the current user's profile
  useEffect(() => {
    if (isCurrentUserProfile && followRef.current) {
      const refElement = followRef.current;
      refElement.addEventListener("scroll", handleInfiniteScroll, {
        passive: true,
      });

      return () => {
        refElement.removeEventListener("scroll", handleInfiniteScroll);
      };
    }
  }, [isCurrentUserProfile, handleInfiniteScroll]);

  return (
    <div className="follow" ref={ref}>
      <div className="heading">
        <span>{heading}</span>
        <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
        <hr />
      </div>

      {isCurrentUserProfile || heading.toLowerCase() === 'following' && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setQuery("")}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      )}

      {heading.toLowerCase() === 'followers' && (
        <div className="warn">
        <span>Only {currentUser.username} can see all followers.</span>
      </div>
      )}

      <div className="user-list" ref={followRef}>
        {follows &&
          follows.map((user) => (
            <div className="user" key={user.id}>
              <div className="profile-image">
                <img src={user.profileUrl} alt={`${user.username} profile`} />
              </div>
              <div className="info">
                <div className="username">{user.username}</div>
                <div className="full-name">{user.fullName}</div>
              </div>
              {isCurrentUserProfile &&
                heading.toLowerCase() === "followers" && (
                  <div className="btn">
                    <button>Remove</button>
                  </div>
                )}
              {isCurrentUserProfile &&
                heading.toLowerCase() === "following" && (
                  <div className="btn">
                    <button>Following</button>
                  </div>
                )}
            </div>
          ))}
      </div>
      {heading.toLowerCase() === 'followers' && Math.abs(follows.length - user.followers) > 0 && (
        <div className="warn">
          <span>And {Math.abs(follows.length - user.followers)} others</span>
        </div>
      )}
    </div>
  );
}

export default FollowModal;
