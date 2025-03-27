import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./CreateChat.scss";
import userService from "../../services/userService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import chatService from "../../services/ChatService";
import useClickOutside from "../../hooks/useClickOutside";

function CreateChat({ closeCreateChat }) {
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const connectedUser = useConnectedUser();
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [userAvatars, setUserAvatars] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const createChatRef = useRef(null);

  useClickOutside(createChatRef, () => closeCreateChat(false));

  const fetchSuggestedFriends = async () => {
    try {
      const response = await userService.getFollowers(connectedUser.authToken);
      if (!response.success) {
        throw new Error(response.error);
      }
      setSuggestedFriends(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const searchUser = async () => {
    if (search.trim().length === 0) {
      setSearchedUsers([]);
      return;
    }

    setIsSearching(true);
    try {
      const userResponse = await userService.searchUsers(
        search,
        0,
        10,
        connectedUser.authToken
      );

      if (!userResponse.success) {
        throw new Error(userResponse.error);
      }

      const filteredUsers = userResponse.data.content.filter(
        (u) => u.username !== connectedUser.username
      );

      setSearchedUsers(filteredUsers);
      fetchAvatarsForUsers(filteredUsers);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchAvatarsForUsers = async (users) => {
    const newAvatars = { ...userAvatars };

    for (const user of users) {
      if (!newAvatars[user.username]) {
        try {
          const response = await userService.getUserProfileByUsername(
            user.username,
            connectedUser.authToken
          );

          if (response.success) {
            newAvatars[user.username] = URL.createObjectURL(response.data);
          }
        } catch (error) {
          console.error(`Failed to load ${user.username}'s avatar:`, error);
        }
      }
    }

    setUserAvatars(newAvatars);
  };

  const fetchUserByUsername = async (username) => {
    try {
      const response = await userService.getUserByUsername(
        username,
        connectedUser.authToken
      );

      if (!response.success) {
        throw new Error(response.error);
      }

      return response.data;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  const handleCreateChat = async () => {
    if (!selectedUser) return;

    setIsCreatingChat(true);
    try {
      const senderUser = await fetchUserByUsername(connectedUser.username);
      if (!senderUser) return;

      const receiverUser = await fetchUserByUsername(selectedUser.username);
      if (!receiverUser) return;

      const response = await chatService.createChat(
        senderUser.id,
        receiverUser.id,
        connectedUser.authToken
      );

      if (!response.success) {
        throw new Error(`Failed to create chat with ${receiverUser.username}`);
      }

      toast.success(`Successfully created chat with ${receiverUser.username}`);
      closeCreateChat();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsCreatingChat(false);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser((prev) => (prev?.id === user.id ? null : user));
  };

  useEffect(() => {
    fetchSuggestedFriends();
  }, []);

  useEffect(() => {
    if (suggestedFriends.length > 0) {
      fetchAvatarsForUsers(suggestedFriends);
    }
  }, [suggestedFriends]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUser();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="create-chat-overlay">
      <div className="create-chat" ref={createChatRef}>
        <div className="heading">
          <span>New message</span>
          <button className="close-btn" onClick={() => closeCreateChat(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <hr />
        </div>

        <div className="search">
          <label htmlFor="search-input">To:</label>
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isCreatingChat}
          />
        </div>

        <div className="suggested">
          <div className="heading">
            <span>{search ? "Search results" : "Suggested"}</span>
          </div>

          {isSearching ? (
            <div className="loading">Searching...</div>
          ) : (
            <>
              <div className="suggested-users">
                {!search &&
                  suggestedFriends.map((friend) => (
                    <div
                      className={`friend ${
                        selectedUser?.id === friend.id ? "selected" : ""
                      }`}
                      key={friend.id}
                    >
                      <div className="profile">
                        <img
                          src={
                            userAvatars[friend.username] ||
                            `data:image/png;base64,${friend.avtar}`
                          }
                          alt={friend.username}
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                      </div>
                      <div className="username">
                        <span>{friend.username}</span>
                      </div>
                      <div className="check-box">
                        <input
                          type="checkbox"
                          onChange={() => handleSelectUser(friend)}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="searched-users">
                {search &&
                  searchedUsers.map((user) => (
                    <div
                      className={`friend ${
                        selectedUser?.id === user.id ? "selected" : ""
                      }`}
                      key={user.id}
                    >
                      <div className="profile">
                        <img
                          src={
                            userAvatars[user.username] ||
                            `data:image/png;base64,${user.avtar}`
                          }
                          alt={user.username}
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                      </div>
                      <div className="username">
                        <span>{user.username}</span>
                      </div>
                      <div className="check-box">
                        <input
                          type="checkbox"
                          onChange={() => handleSelectUser(user)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>

        <div className="create-btn">
          {selectedUser && (
            <div className="selected-friend">
              <span>Selected: {selectedUser?.username}</span>
            </div>
          )}
          <button
            className={`${selectedUser ? "btn" : "disable"}`}
            onClick={handleCreateChat}
            disabled={!selectedUser || isCreatingChat}
          >
            {isCreatingChat ? "Creating..." : "Chat"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
