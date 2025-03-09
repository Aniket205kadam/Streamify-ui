import React, { useState } from "react";
import "./ChatPage.scss";
import CreateChat from "../../components/chat/CreateChat";
import PreviousChat from "../../components/chat/PreviousChat";
import ChatWindow from "../../components/chat/ChatWindow";

function ChatPage() {
  const [currChat, setCurrChat] = useState("");

  return (
    <div className="chat-page">
      {false && <CreateChat />}
      <div className="left">
        <PreviousChat setCurrChat={setCurrChat} />
      </div>

      <div className="right">
        <ChatWindow chat={currChat} />
      </div>
    </div>
  );
}

export default ChatPage;
