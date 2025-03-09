import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./CreateChat.scss";

// Fake data
const fakeData = {
  suggestedFriends: [
    {
      id: 1,
      username: "alice_smith",
      profile: "https://randomuser.me/api/portraits/women/2.jpg",
      mutualFollowers: 12,
    },
    {
      id: 2,
      username: "bob_johnson",
      profile: "https://randomuser.me/api/portraits/men/4.jpg",
      mutualFollowers: 8,
    },
    {
      id: 3,
      username: "emma_wilson",
      profile: "https://randomuser.me/api/portraits/women/5.jpg",
      mutualFollowers: 15,
    },
  ],
  searchedUsers: [
    {
      id: 4,
      username: "mike_ross",
      profile: "https://randomuser.me/api/portraits/men/6.jpg",
      mutualFollowers: 4,
    },
    {
      id: 5,
      username: "sarah_jones",
      profile: "https://randomuser.me/api/portraits/women/7.jpg",
      mutualFollowers: 6,
    },
  ],
};

function CreateChat() {
  const [search, setSearch] = React.useState("");
  const { suggestedFriends, searchedUsers } = fakeData;

  return (
    <div className="create-chat-overlay">
      <div className="create-chat">
        <div className="heading">
          <span>New message</span>
          <span onClick={() => console.log("close")}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <hr />
        </div>

        <div className="search">
          <span>To:</span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="suggested">
          <div className="heading">
            <span>Suggested</span>
          </div>

          <div className="suggested-users">
            {!search &&
              suggestedFriends.map((friend) => (
                <div className="friend" key={friend.id}>
                  <div className="profile">
                    <img src={friend.profile} alt={friend.username} />
                  </div>
                  <div className="username">
                    <span>{friend.username}</span>
                    <small>{friend.mutualFollowers}</small>
                  </div>
                  <div className="check-box">
                    <input type="checkbox" />
                  </div>
                </div>
              ))}
          </div>

          <div className="searched-users">
            {search &&
              searchedUsers.map((user) => (
                <div className="friend" key={user.id}>
                  <div className="profile">
                    <img src={user.profile} alt={user.username} />
                  </div>
                  <div className="username">
                    <span>{user.username}</span>
                    <small>{user.mutualFollowers}</small>
                  </div>
                  <div className="check-box">
                    <input type="checkbox" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="create-btn">
          <button className="disable">Chat</button>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
