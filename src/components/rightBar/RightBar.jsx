import React from "react";
import "./RightBar.scss";
import { Link } from "react-router-dom";

function RightBar({ isBlur }) {
  const connectedUser = {
    id: "121212",
    username: "aniket205kadam",
    profileUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    fullName: "Aniket Kadam",
  };

  const suggestedFriends = [
    {
      user: {
        id: "1",
        username: "john_doe",
        profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      followedBy: ["alice_wonder", "mike_ross", "emma_smith"],
    },
    {
      user: {
        id: "2",
        username: "sarah_lee",
        profileUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      followedBy: ["david_clark", "lucas_johnson"],
    },
    {
      user: {
        id: "3",
        username: "mark_taylor",
        profileUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      followedBy: ["sophia_miller", "jessica_jones", "daniel_brown"],
    },
    {
      user: {
        id: "4",
        username: "olivia_white",
        profileUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      followedBy: ["jack_wilson", "hannah_olsen"],
    },
  ];

  return (
    <div className={`rightBar ${isBlur ? "blurred" : ""}`}>
      <div className="container">
        {/* Connected User Section */}
        <div className="connected-user">
          <img
            src={connectedUser.profileUrl}
            alt={`${connectedUser.fullName} profile`}
          />
          <div className="user-info">
            <span className="username">{connectedUser.username}</span>
            <span className="fullName">{connectedUser.fullName}</span>
          </div>
        </div>
        <div className="suggested-users">
          <div className="header">
            <span>Suggestions For You</span>
            <Link to="/explore/people/" className="see-all">
              See All
            </Link>
          </div>
          {suggestedFriends.map((friend) => (
            <div className="user" key={friend.user.id}>
              <div className="userInfo">
                <Link className="profile" to={`/${friend.user.username}/`}>
                  {" "}
                  <img
                    src={friend.user.profileUrl}
                    alt={friend.user.username}
                  />
                </Link>
                <div>
                  <Link className="profile" to={`/${friend.user.username}/`}>
                    <span className="username">{friend.user.username}</span>
                  </Link>
                  <br />
                  {friend.followedBy.length > 0 && (
                    <span className="followedBy">
                      Followed by {friend.followedBy[0]}
                      {friend.followedBy.length > 1 && (
                        <span> + {friend.followedBy.length - 1}</span>
                      )}
                    </span>
                  )}
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
