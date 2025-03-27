import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useConnectedUser from "../../hooks/useConnectedUser";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import chatService from "../../services/ChatService";
import TimeConverter from "../timeConverter/TimeConverter";
import CreateChat from "./CreateChat";

function PreviousChat({ setCurrChat }) {
  const connectedUser = useConnectedUser();
  const [connectedUserProfile, setConnectedUserProfile] = useState();
  const [previousChats, setPreviousChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatProfiles, setChatProfiles] = useState([]); // [{id: username, data: profileUrl }, {...}, ...]
  const [isChatCreating, setIsChatCreating] = useState(false);

  useEffect(() => {
    // loading connectedUser profile url
    (async () => {
      const userResponse = await userService.getUserProfileByUsername(
        connectedUser.username,
        connectedUser.authToken
      );
      if (!userResponse.success) {
        toast.error(userResponse.error);
        return;
      }
      setConnectedUserProfile(URL.createObjectURL(userResponse.data));
    })();

    // load previous chats
    (async () => {
      const chatResponse = await chatService.getMyChats(
        connectedUser.authToken
      );
      if (!chatResponse.success) {
        toast.error("Failed to load previous chats!");
        return;
      }
      console.log(chatResponse.data);
      setPreviousChats(chatResponse.data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!previousChats) return;

    // load the chat profile
    (async () => {
      (previousChats || []).forEach(async (chat) => {
        const userResponse = await userService.getUserProfileByUsername(
          chat.username,
          connectedUser.authToken
        );
        if (!userResponse.success) {
          toast.warn("Failed to get " + chat.username + " profile");
        }
        console.log("chat: ", chat.unreadCount)
        setChatProfiles((prevProfiles) =>
          prevProfiles
            ? [
                ...prevProfiles,
                {
                  id: chat.username,
                  data: URL.createObjectURL(userResponse.data),
                },
              ]
            : [
                {
                  id: chat.username,
                  data: URL.createObjectURL(userResponse.data),
                },
              ]
        );
      });
    })();
  }, [previousChats]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="chat-container">
      {isChatCreating && <CreateChat closeCreateChat={setIsChatCreating} />}
      <div className="chat-header">
        <div className="user-info">
          <img src={connectedUserProfile} alt={connectedUser.username} />
          <h3>{connectedUser.username}</h3>
        </div>
        <button className="new-chat-btn" onClick={() => setIsChatCreating(true)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>

      <div className="chat-list">
        <div className="chat-list-header">
          <h4>Messages</h4>
        </div>

        {(previousChats || []).map((chat) => (
          <div
            className="chat-item"
            key={chat.id}
            onClick={() => setCurrChat(chat)}
          >
            <div className="profile-container">
              <img
                src={
                  chatProfiles.find((c) => c.id === chat.username)?.data ||
                  "https://media.tenor.com/-n8JvVIqBXkAAAAM/dddd.gif"
                }
                alt={chat.name}
              />
              {chat.online && <div className="online-indicator" />}
            </div>
            <div className="chat-info">
              <div className="user-meta">
                <span className="username">{chat.name}</span>
                <span className="timestamp">
                  <TimeConverter timestamp={chat.lastMessageTime} />
                </span>
              </div>
              <div className="message-preview">
                {chat.lastMessagedUsername === connectedUser.username ? (
                  <span className="you">You: </span>
                ) : null}
                {chat.lastMessage}
              </div>
            </div>
            {chat.unreadCount != 0 && (
              <div className="notification">
                <span>{chat.unreadCount}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousChat;
