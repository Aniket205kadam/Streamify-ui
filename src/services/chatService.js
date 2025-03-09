class chatService {
  chatBaseUrl = "http://localhost:8080/api/v1/chats";
  messageBaseUrl = "http://localhost:8080/api/v1/messages";

  async createChat(senderId, receiverId, token, timeout = 20000) {
    if (senderId === null || receiverId === null)
      throw new Error("Sender and Receiver Id is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const formData = new FormData();
      formData.append("sender_id", senderId);
      formData.append("receiver_id", receiverId);

      const response = await fetch(`${this.chatBaseUrl}`, {
        method: "POST",
        headers: {
          Authentication: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
        data: response.json(),
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    }
  }

  async getMyChats(token, timeout = 20000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.chatBaseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
        data: await response.json(),
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    }
  }

  async getChatMessages(chatId, token, timeout = 20000) {
    if (chatId === null || chatId === "")
      throw new Error("Chat Id is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.chatBaseUrl}/chat/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
        data: await response.json(),
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    }
  }

  async sendTextMessage(
    chatId,
    content,
    senderUsername,
    receiverUsername,
    token,
    timeout = 20000
  ) {
    if (chatId === null || chatId === "")
      throw new Error("Chat Id is required!");
    if (content === null || content === "")
      throw new Error("Content Id is required!");
    if (senderUsername === null || senderUsername === "")
      throw new Error("SenderUsername is required!");
    if (receiverUsername === null || receiverUsername === "")
      throw new Error("ReceiverUsername is required!");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const type = "TEXT";
    const messageRequest = {
      chatId,
      content,
      senderUsername,
      receiverUsername,
      type,
    };

    try {
      const response = await fetch(`${this.messageBaseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
        body: JSON.stringify(messageRequest),
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    }
  }

  async seenMessages(chatId, token, timeout = 20000) {
    if (chatId === null || chatId === "")
      throw new Error("Chat Id is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.messageBaseUrl}?chat-id=${chatId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    }
  }

  async uploadFile(chatId, file, token, timeout = 20000) {
    if (file === null)
      throw new Error("File is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const request = new FormData();
      request.append("chat-id", chatId)
      request.append("file", file);
      const response = await fetch(`${this.messageBaseUrl}/upload-media`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: request,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    }
  }
}

export default new chatService();
