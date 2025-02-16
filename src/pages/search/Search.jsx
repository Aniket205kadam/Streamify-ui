import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import "./Search.scss";
import SearchLoader from "./SearchLoader";

function Search({ ref }) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const recentSearchsFeak = [
    {
      id: "1234",
      profileUrl:
        "https://images.pexels.com/photos/1194806/pexels-photo-1194806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      username: "rohini",
      fullName: "rohini sharma",
      isFollowing: false,
      followersCount: 10,
    },
    {
      id: "1234",
      profileUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC0FDNB1TTDRbwvNWLH-QNBSpSsFtKpYd0wQ&s",
      username: "rohitsharma45",
      fullName: "Rohit Sharma",
      isFollowing: true,
      followersCount: 1000,
    },
  ];
  const result = [
    {
      id: "5678",
      profileUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      username: "aisha_k",
      fullName: "Aisha Khan",
      isFollowing: true,
      followersCount: 500,
    },
    {
      id: "9101",
      profileUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      username: "john_doe",
      fullName: "John Doe",
      isFollowing: false,
      followersCount: 150,
    },
    {
      id: "1121",
      profileUrl:
        "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
      username: "samantha_smith",
      fullName: "Samantha Smith",
      isFollowing: true,
      followersCount: 1200,
    },
    {
      id: "3141",
      profileUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      username: "max_well",
      fullName: "Maxwell Johnson",
      isFollowing: false,
      followersCount: 300,
    },
  ];

  const [query, setQuery] = useState(null);
  const [startSearching, setStartSearching] = useState(false);
  const [recentSearchs, setRecentSearchs] = useState(recentSearchsFeak);
  const [similerUsers, setSimilerUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const recentRef = useRef(null);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      if (!(query === null || query?.length === 0)) {
        setStartSearching(true);
        setLoading(true);
        console.log("api call");
        await delay(2000);
        setLoading(false);
        setSimilerUsers(result);
      }
      if (query === null || query?.length === 0) {
        setStartSearching(false);
      }
    }
    getData();
  }, [query]);

  return (
    <div className="search-page" ref={ref}>
      <div className="search">
        <h1>Search</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleQuery}
          />
          {query != null && query != "" && (
            <button>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  setQuery("");
                }}
              />
            </button>
          )}
        </div>
        {!startSearching ? (
          <div className="recent" ref={recentRef}>
            <hr />
            <h2>Recent</h2>
            {recentSearchs?.length === 0 && <span className="msg">No recent searches.</span>}
            {recentSearchs?.map((recent) => (
              <div className="user-info" key={recent.username}>
                <div className="user-profile">
                  <img
                    src={recent.profileUrl}
                    alt={recent.username + " profile"}
                  />
                </div>
                <div className="details">
                  <div className="username">{recent.username}</div>
                  <div className="info">
                    <span>{recent.fullName}</span>{" "}
                    {recent.isFollowing ? (
                      <span>• Following</span>
                    ) : (
                      <span>• {recent.followersCount} Followers</span>
                    )}
                  </div>
                </div>
                <div className="recent-delete">
                  <button
                    onClick={() =>
                      console.log("delete from the recent: " + recent.username)
                    }
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="searched-users">
            {loading && <SearchLoader count={10} />}
            {similerUsers?.map((user) => (
              <div className="user-info" key={user.username}>
                <div className="user-profile">
                  <img src={user.profileUrl} alt={user.username + " profile"} />
                </div>
                <div className="details">
                  <div className="username">{user.username}</div>
                  <div className="info">
                    <span>{user.fullName}</span>{" "}
                    {user.isFollowing ? (
                      <span>• Following</span>
                    ) : (
                      <span>• {user.followersCount}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
