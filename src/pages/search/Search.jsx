import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import "./Search.scss";
import SearchLoader from "./SearchLoader";
import userService from "../../services/userService";
import useAuthToken from "../../hooks/useAuthToken";
import ShowInfoBanner from "../../components/popups/ShowInfoBanner";
import { useNavigate } from "react-router-dom";

function Search({ ref, setShowSearchBox }) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [query, setQuery] = useState("");
  const [startSearching, setStartSearching] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);
  const [similerUsers, setSimilerUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const recentRef = useRef(null);

  const authToken = useAuthToken();

  const handleQuery = (event) => {
    setQuery(event.target.value || "");
  };

  useEffect(() => {
    (async () => {
      setError(false);
      if (query !== null && query !== "") {
        setStartSearching(true);
        setLoading(true);
        await delay(2000);
        setLoading(false);
        const response = await userService.searchUsers(
          query,
          page,
          5,
          authToken
        );
        if (!response.success) {
          setError(response.error);
          return;
        }
        setSimilerUsers(response.data.content);
      }
      if (query === null || query === "") {
        setStartSearching(false);
      }
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      setError(false);
      setRecentLoading(true);
      const response = await userService.getRecentSearch(authToken);
      if (!response.success) {
        setError(response.error);
        return;
      }
      setRecentSearch(response.data);
      setRecentLoading(false);
    })();
  }, [authToken]);

  return (
    <div className="search-page" ref={ref}>
      {error && <ShowInfoBanner msg={"🐞ERROR: " + error} />}
      <div className="search">
        <h1>Search</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleQuery}
          />
          {query !== null && query !== "" && (
            <button>
              <FontAwesomeIcon icon={faXmark} onClick={() => setQuery("")} />
            </button>
          )}
        </div>
        {!startSearching ? (
          <div className="recent" ref={recentRef}>
            <hr />
            <h2>Recent</h2>
            {/* TODO: fix it later */}
            {/* {recentLoading ? (
              <span>Loading...</span>
            ) : (
              <div className="recent-section">
                {recentSearch.length === 0 && (
                  <span className="msg">No recent searches.</span>
                )}
                {recentSearch.map((recent) => (
                  <UserCard key={recent.id} user={recent} setError={setError} />
                ))}
              </div>
            )} */}
          </div>
        ) : (
          <div className="searched-users">
            {loading && <SearchLoader count={10} />}
            {similerUsers.length === 0 && (
              <div className="msg">
                <p>There is no user found.</p>
              </div>
            )}
            {similerUsers.length > 0 &&
              similerUsers.map((user) => (
                <UserCard key={user.id} user={user} setError={setError} setShowSearchBox={setShowSearchBox} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserCard({ user, setError, setShowSearchBox }) {
  const [userProfile, setUserProfile] = useState();
  const authToken = useAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await userService.getUserProfileByUsername(
        user.username,
        authToken
      );
      if (!response.success) {
        setError(response.error);
        return;
      }
      setUserProfile(URL.createObjectURL(response.data));
    })();
  }, []);

  const handleClickOnUser = async () => {
    const response = await userService.addRecentSearchedUsers(
      user.username,
      authToken
    );
    navigate(`/profile/${user.username}`)
    setShowSearchBox(false);
    if (!response.success) {
      setError(response.error);
      return;
    }
  };

  return (
    <div className="user-info" key={user.id} onClick={handleClickOnUser}>
      <div className="user-profile">
        <img src={userProfile} alt={user.username + " profile"} />
      </div>
      <div className="details">
        <div className="username">{user.username}</div>
        <div className="info">
          <span>{user.fullName}</span>{" "}
          {user.isFollowedByCurrentUser ? (
            <span>• Following</span>
          ) : (
            <span>• {user.followerCount}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
