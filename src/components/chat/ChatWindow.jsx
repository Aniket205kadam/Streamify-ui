import {
  faEnvelope,
  faHeart,
  faImage,
  faSmile,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faCheckDouble,
  faMessage,
  faMicrophone,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import userService from "../../services/userService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import ChatService from "../../services/ChatService";
import TimeConverter from "../timeConverter/TimeConverter";
import EmojiPicker from "emoji-picker-react";
import useClickOutside from "../../hooks/useClickOutside";
import SendBtn from "./SendBtn";
import Heart from "../3D-componets/Heart";

function ChatWindow({ chat }) {
  // // const [messages, setMessages] = useState([
  // //   {
  // //     id: 1,
  // //     content: "Hey there! 👋",
  // //     createdAt: "10:00 AM",
  // //     user: { username: "johndoe" },
  // //   },
  // //   {
  // //     id: 2,
  // //     content: "Hi! How's it going?",
  // //     createdAt: "10:05 AM",
  // //     user: { username: "me" },
  // //   },
  // //   {
  // //     id: 3,
  // //     content: "Great! Want to grab coffee?",
  // //     createdAt: "10:10 AM",
  // //     user: { username: "johndoe" },
  // //   },
  // // ]);

  // const friend = {
  //   profileUrl: "https://via.placeholder.com/150",
  //   username: "johndoe",
  //   fullName: "John Doe",
  //   lastActive: "5m",
  // };

  // const connectedUser = { username: "me" };
  const isFollower = true;

  const connectedUser = useConnectedUser();
  const [currChatProfile, setCurrChatProfile] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMutualFriend, setIsMutualFriend] = useState(false);
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const emojiRef = useRef(null);
  const messageEndRef = useRef(null);
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);

  useClickOutside(emojiRef, setIsOpenEmojiPicker);

  useEffect(() => {
    if (chat === null || chat === "") return;
    // load the chat profile
    (async () => {
      const userResponse = await userService.getUserProfileByUsername(
        chat.username,
        connectedUser.authToken
      );
      if (!userResponse.success) {
        toast.warn("Failed to load " + chat.username + " profile");
        return;
      }
      setCurrChatProfile(URL.createObjectURL(userResponse.data));
    })();

    // check it is mutual friend
    (async () => {
      const userResponse = await userService.isMutualFriend(
        chat.username,
        connectedUser.authToken
      );
      console.log("mutual", userResponse);
      if (!userResponse.status) {
        toast.error(userResponse.data);
        return;
      }
      setIsMutualFriend(userResponse.data);
    })();

    // load the chat messages
    (async () => {
      const messageResponse = await ChatService.getChatMessages(
        chat.id,
        connectedUser.authToken
      );
      if (!messageResponse.status) {
        toast.error("Failed to load the messages");
        return;
      }
      setMessages(messageResponse.data);
    })();

    // seen message
    const seenMessages = async () => {
      const chatResponse = await ChatService.seenMessages(
        chat.id,
        connectedUser.authToken
      );
      if (!chatResponse.success) {
        toast.error(chatResponse.error);
        return;
      }
    };

    setTimeout(() => {
      seenMessages();
    }, 2000);
  }, [chat]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    const chatResponse = await ChatService.sendTextMessage(
      chat.id,
      msg,
      connectedUser.username,
      chat.username,
      connectedUser.authToken
    );
    if (!chatResponse.success) {
      toast.error("Failed to send message🥵");
      return;
    }
    setMsg("");
  };

  const heartClickedHandler = async () => {
    const chatResposne = await ChatService.sendTextMessage(
      chat.id,
      "❤️",
      connectedUser.username,
      chat.username,
      connectedUser.authToken
    );
    if (!chatResposne.success) {
      toast.error("Failed to send heart...");
      return;
    }
  };

  const submitFileHandler = (event) => {
    setFile(event.target.files[0]);
    toast.info("File is selected");
  };

  const fileUploadHandler = async () => {
    const fileResponse = await ChatService.uploadFile(
      chat.id,
      file,
      connectedUser.authToken
    );
    if (!fileResponse.success) {
      toast.error(fileResponse.error);
      return;
    }
    setFile(null)
  };

  if (chat === null || chat === "") {
    return (
      <div className="display-msg">
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className="info">
          <h1>Your messages</h1>
          <h4>Send a message to start a chat.</h4>
        </div>
        <div className="btn">
          <button>Send message</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="header">
        <div className="user-info">
          <div className="profile-pic">
            <img src={currChatProfile} alt={chat.username + " profile"} />
            {false && <div className="online-status" />}
          </div>
          <div className="user-details">
            <span className="username">{chat.name}</span>
            {isFollower && <span className="status">Active 2min ago</span>}
          </div>
        </div>
      </div>

      <div className="chat-container">
        {file && (
          <div className="selectedFile">
            <div className="content">
              <img src={URL.createObjectURL(file)} />
            </div>
            <div className="btn">
              <button onClick={fileUploadHandler}>
                <FontAwesomeIcon icon={faUpload} />
              </button>
            </div>
          </div>
        )}
        <div className="messages">
          {messages.map((message) => (
            <div
              className={`message-bubble ${
                message.senderUsername === connectedUser.username
                  ? "sent"
                  : "received"
              }
              ${message.content === "❤️" ? "transparent" : ""}`}
              key={message.id}
            >
              {message.content === "❤️" && <Heart />}
              {message.content != "❤️" && message.messageType === "TEXT" ? (
                <div className="content">{message.content}</div>
              ) : message.messageType === "IMAGE" ? (
                <img
                  src={`data:${message.mediaType};base64,${message.mediaBase64}`}
                  key={message.id}
                />
              ) : (
                <video
                  src={`data:${message.mediaType};base64,${message.mediaBase64}`}
                  key={message.id}
                />
              )}
              <div className="timestamp">
                <TimeConverter timestamp={message.createdAt} />
              </div>
              <div ref={messageEndRef} />
            </div>
          ))}
        </div>

        <div className="message-input">
          <div className="input-container">
            <button
              className="emoji-btn"
              onClick={() => setIsOpenEmojiPicker(true)}
            >
              <FontAwesomeIcon icon={faSmile} />
            </button>
            <input
              type="text"
              placeholder="Message..."
              value={msg}
              onChange={(event) => setMsg(event.target.value)}
            />
            {msg === "" ? (
              <></>
            ) : (
              <div className={`send-btn`} onClick={sendMessage}>
                <SendBtn />
              </div>
            )}
            <button
              className="media-btn"
              onClick={() => {
                if (inputFileRef.current) {
                  inputFileRef.current.click();
                }
              }}
            >
              <input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
                onChange={submitFileHandler}
              />
              <FontAwesomeIcon icon={faImage} />
            </button>
            {isMutualFriend && (
              <>
                <button className="voice-btn">
                  <FontAwesomeIcon icon={faMicrophone} />
                </button>
                <button className="like-btn" onClick={heartClickedHandler}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </>
            )}
          </div>
          {isOpenEmojiPicker && (
            <div className={`emoji-picker`} ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setMsg((prev) => prev + emojiData.emoji);
                }}
                previewConfig={{ showPreview: false }}
                skinTonesDisabled
                theme="light"
                searchDisabled
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// const SelectedFile = (file) => {
//   if (!file) return;
//   return (

//   );
// };

export default ChatWindow;
