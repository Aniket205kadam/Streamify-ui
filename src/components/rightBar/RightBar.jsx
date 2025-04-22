import React, { useEffect, useState } from "react";
import "./RightBar.scss";
import { Link } from "react-router-dom";
import useConnectedUser from "../../hooks/useConnectedUser";
import userService from "../../services/userService";
import { toast } from "react-toastify";

function RightBar({ isBlur }) {
  const connectedUser = useConnectedUser();
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  useEffect(() => {
    (async () => {
      const userResposne = await userService.getUserByUsername(
        connectedUser.username,
        connectedUser.authToken
      );
      if (!userResposne.success) {
        toast.error(userResposne.error);
        return;
      }
      setFullName(userResposne.data.fullName);
    })();

    (async () => {
      const friendsResponse = await userService.getSuggestedFriends(
        connectedUser.authToken,
        0,
        5
      );
      if (!friendsResponse.success) {
        toast.error(friendsResponse.error);
        return;
      }
      setSuggestedFriends(friendsResponse.data.content);
      setLoading(false);
    })();
  }, []);

  return (
    <div className={`rightBar ${isBlur ? "blurred" : ""}`}>
      <div className="container">
        {/* Connected User Section */}
        <div className="connected-user">
          <img src={connectedUser.profileUrl} alt={`${fullName} profile`} />
          <div className="user-info">
            <span className="username">{connectedUser.username}</span>
            <span className="fullName">{fullName}</span>
          </div>
        </div>
        <div className="suggested-users">
          {suggestedFriends.length > 0 && (
            <div className="header">
              <span>Suggestions For You</span>
              <Link to="/explore/people/" className="see-all">
                See All
              </Link>
            </div>
          )}
          {(suggestedFriends || []).map((friend, idx) => (
            <div className="user" key={friend.id}>
              <div className="userInfo">
                <Link className="profile" to={`/profile/${friend.username}/`}>
                  {" "}
                  <img
                    src={
                      friend.avtar
                    }
                    alt={friend.username}
                  />
                </Link>
                <div className="userDetails">
                  <Link className="profile" to={`/profile/${friend.username}/`}>
                    <span className="username">{friend.username}</span>
                  </Link>
                  <br />
                  <span className="follower-count">
                    {friend.followerCount} Followers
                  </span>
                </div>
              </div>
              <button
                className="follow-btn"
                onClick={() => console.log(friend.user.username)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer className="rightBar-footer">
        <p>
          <Link to="#" className="info">
            · About
          </Link>
          <Link to="#" className="info">
            · Help
          </Link>
          <Link to="#" className="info">
            · Press
          </Link>
          <Link to="#" className="info">
            · API
          </Link>
          <Link to="#" className="info">
            · Jobs
          </Link>
          <Link to="#" className="info">
            · Privacy
          </Link>
          <Link to="#" className="info">
            · Terms
          </Link>
          <Link to="#" className="info">
            · Locations
          </Link>
          <Link to="#" className="info">
            · Language
          </Link>
        </p>
        <p>© 2025 STREAMIFY FROM ANIKETKADAM.DEV</p>
      </footer>
    </div>
  );
}

export default RightBar;
