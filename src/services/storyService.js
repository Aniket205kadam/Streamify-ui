class storyService {
  baseUrl = "http://localhost:8080/api/v1/stories";
  userbaseUrl = "http://localhost:8080/api/v1/users";
  mediaUrl = "http://localhost:8080/api/v1/media";

  async addStory(request, token, timeout = 10000) {
    if (!request)
      throw new Error("StoryRequest is required for to add the story!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    console.log("request: ", request);

    try {
      const formData = new FormData();
      formData.append("caption", request.caption);
      formData.append("content", request.content);

      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
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
        data: await response.text(),
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

  async isConnectedUserHasStory(token, timeout = 10000) {
    if (!token)
      throw new Error(
        "Authentication token is missing we need this to connect to the server!"
      );
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.userbaseUrl}/has-story`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        data: await response.text(),
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

  async getFollowingsStories(token, timeout = 10000) {
    if (!token)
      throw new Error(
        "Authentication token is missing we need this to connect to the server!"
      );
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/get/followers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

  async getStoriesByUser(username, token, timeout = 10000) {
    if (username === null) throw new Error("Username is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.userbaseUrl}/${username}/stories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

  async getStoryContent(storyId, token, timeout = 10000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.mediaUrl}/story/${storyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        data: await response.blob(),
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

  async isLiked(storyId, token, timeout = 10000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${storyId}/isLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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
        data: await response.text(),
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

  async likeStory(storyId, token, timeout = 10000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${storyId}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

  async sendReply(storyId, content, token, timeout = 20000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${storyId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
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

  async viewStory(storyId, token, timeout = 20000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${storyId}/view`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

  async getStoryReplies(storyId, page, size, token, timeout = 20000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${storyId}/replies?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );
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

  async getStoryViewers(storyId, page, size, token, timeout = 20000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${storyId}/views?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );
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

  async getStoryLikedUser(storyId, token, timeout = 20000) {
    if (storyId === null) throw new Error("StoryId is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${storyId}/get/liked/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      const json = await response.json();
      console.log("reponse array: " + Array.isArray(json));
      console.log("length: " + json.length);
      return {
        success: true,
        status: response.status,
        data: json,
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

export default new storyService();
