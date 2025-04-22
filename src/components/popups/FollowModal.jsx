import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./FollowModal.scss";
import userService from "../../services/userService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";

function FollowModal({
  ref,
  heading,
  follows,
  user,
  onClose,
  handleAnotherPage,
  onSearch,
  isCurrentUserProfile = false,
}) {
  const followRef = useRef(null);
  const [query, setQuery] = useState("");

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
      onSearch(query);
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
        <FontAwesomeIcon icon={faXmark} onClick={onClose} />
        <hr />
      </div>

      {isCurrentUserProfile && (
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

      {/* {heading.toLowerCase() === "followers" && !isCurrentUserProfile && (
        <div className="warn">
          <span>Only {user.username} can see all followers.</span>
        </div>
      )} */}

      <div className="user-list" ref={followRef}>
        {follows &&
          follows.map((user) => (
            // <div className="user" key={user.id}>
            //   <div className="profile-image">
            //     <img src={user.avtar} alt={`${user.username} profile`} />
            //   </div>
            //   <div className="info">
            //     <div className="username">{user.username}</div>
            //     <div className="full-name">{user.fullName}</div>
            //   </div>
            //   {isCurrentUserProfile &&
            //     heading.toLowerCase() === "followers" && (
            //       <div className="btn">
            //         <button>Remove</button>
            //       </div>
            //     )}
            //   {isCurrentUserProfile &&
            //     heading.toLowerCase() === "following" && (
            //       <div className="btn">
            //         <button>Following</button>
            //       </div>
            //     )}
            // </div>
            <UserAvtar
              user={user}
              isCurrentUserProfile={isCurrentUserProfile}
              heading={heading}
              key={user.id}
            />
          ))}
      </div>
      {/* {heading.toLowerCase() === 'followers' && Math.abs(follows.length - user.followers) > 0 && (
        <div className="warn">
          <span>And {Math.abs(follows.length - user.followers)} others</span>
        </div>
      )} */}
    </div>
  );
}

const UserAvtar = ({ user, isCurrentUserProfile, heading }) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const connectedUser = useConnectedUser();

  const isFollowingUser = async () => {
    const response = await userService.isFollowingUser(user.id, connectedUser.authToken);
    if (!response.success) {
      toast.error("Failed to find is user in folliwing list..!");
      return;
    }
    setIsFollowing(response.data);
    console.log(response.data)
  }

  useEffect(() => {
    isFollowingUser();
  }, []);

  return (
    <div className="user" key={user.id}>
      <div className="profile-image">
        <img src={user.avtar} alt={`${user.username} profile`} />
      </div>
      <div className="info">
        <div className="username">{user.username}</div>
        <div className="full-name">{user.fullName}</div>
      </div>
      {isCurrentUserProfile && heading.toLowerCase() === "followers" && (
        <div className="btn">
          <button>Remove</button>
        </div>
      )}
      {isCurrentUserProfile && heading.toLowerCase() === "following" && (
        <div className="btn-following">
          <button>Following</button>
        </div>
      )}
    </div>
  );
};

export default FollowModal;
