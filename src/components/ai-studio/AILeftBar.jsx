import React, { useEffect, useState } from "react";
import useConnectedUser from "../../hooks/useConnectedUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRobot, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AILeftBar.scss";
import aiService from "../../services/aiService";

function AILeftBar() {
  const connectedUser = useConnectedUser();
  const [chats, setChats] = useState({});
  
  // Dummy data
//   const chats = [
//     { id: 1, avatar: "https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=600", chatName: "Travel Buddy", username: "WanderBot" },
//     { id: 2, avatar: "https://images.pexels.com/photos/2076596/pexels-photo-2076596.jpeg?auto=compress&cs=tinysrgb&w=600", chatName: "Study Partner", username: "EduBot" },
//     { id: 3, avatar: "https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=600", chatName: "Fitness Coach", username: "GymBot" },
//   ];

    useEffect(() => {
        (async () => {
            aiService
        })();
    }, []);

  return (
    <div className="ai-left-bar">
      <div className="header">
        <h1 className="logo">Stremify</h1>
        <h2 className="studio-title">AI Studio</h2>
      </div>

      <nav className="navigation">
        <button className="nav-item active">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Discover</span>
        </button>
        <button className="nav-item">
          <FontAwesomeIcon icon={faRobot} />
          <span>Your AIs</span>
        </button>
        <button className="create-ai-button">
          <FontAwesomeIcon icon={faPlus} />
          <span>Create New AI</span>
        </button>
      </nav>

      {chats.length > 0 && (
        <div className="chat-history">
          <h3 className="section-title">Recent Chats</h3>
          {chats.map((chat) => (
            <div className="chat-item" key={chat.id}>
              <img src={chat.avatar} alt={chat.chatName} className="chat-avatar" />
              <div className="chat-info">
                <span className="chat-name">{chat.chatName}</span>
                <span className="chat-username">@{chat.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="user-profile">
        <img
          src={connectedUser.profileUrl || "https://via.placeholder.com/40"}
          alt={connectedUser.username}
          className="profile-picture"
        />
        <div className="profile-info">
          <span className="username">Aniket Kadam</span>
          <span className="handle">@{connectedUser.username.toLowerCase()}</span>
        </div>
      </div>
    </div>
  );
}

export default AILeftBar;