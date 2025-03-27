class userService {
  baseUrl = "http://localhost:8080/api/v1/users";
  mediaUrl = "http://localhost:8080/api/v1/media/users";

  async getUserByUsername(username, token, timeout = 10000) {
    if (username === null || username === "")
      throw new Error("Username is required for search the user!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/username/${username}`, {
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

  async getSuggestedFriends(token, page, size, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/suggestedUsers?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  async getUserProfileByUsername(username, token, timeout = 10000) {
    if (username === "")
      throw new Error("Username is required for get user profile image!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.mediaUrl}/${username}/profile/image`,
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

  async getMyPosts(token, page, size, timeout = 1000) {
    if (token === "") throw new Error("Token is required for get user posts!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/my-posts?page=${page}&size=${size}`,
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

  async getPostByUser(userId, page, size, token, timeout = 10000) {
    if (userId === "")
      throw new Error("User ID is required for get user posts!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${userId}/posts?page=${page}&size=${size}`,
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

  async getReelsByUser(userId, page, size, token, timeout = 10000) {
    if (userId === "")
      throw new Error("User ID is required for get user reels!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${userId}/reels?page=${page}&size=${size}`,
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

  async getMyReels(token, page, size, timeout = 1000) {
    if (token === "") throw new Error("Token is required for get user posts!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/my-reels?page=${page}&size=${size}`,
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

  async searchUsers(query, page, size, token, timeout = 10000) {
    if (query === "" || query === null)
      throw new Error("Query is required for search the users!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/search?query=${query}&page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  async addRecentSearchedUsers(username, token, timeout = 10000) {
    if (username === "" || username === null)
      throw new Error("Username is required to add user recent search!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/search/recent?username=${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  async getRecentSearch(token, timeout = 1000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/search/recent`, {
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

  async followUser(followingUserId, token, timeout = 1000) {
    if (followingUserId === "" || followingUserId === null)
      throw new Error("User ID is required for follow the user!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/follow/${followingUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  async isFollowingUser(followingUserId, token, timeout = 10000) {
    if (followingUserId === "" || followingUserId === null)
      throw new Error("User ID is required for get following users!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/isFollowing/${followingUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  async getInfoAboutAccount(username, token, timeout = 10000) {
    if (username === "" || username === null)
      throw new Error("username is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${username}/about-account`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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

  async isMutualFriend(username, token, timeout = 10000) {
    if (username === "" || username === null)
      throw new Error("username is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/isMutualFriend/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
      const result = await response.text();
      const isFriend = result === "true";
      return {
        success: true,
        status: response.status,
        data: isFriend,
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

  async getFollowers(token, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/followings`, {
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
      const json = await response.json();
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

  async uploadUserProfile(file, token, timeout = 10000) {
    if (file === null) {
      return {
        success: false,
        status: null,
        error: "File is required to upload the avtar",
      };
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const request = new FormData();
      request.append("avtar", file);
      const response = await fetch(`${this.baseUrl}/avtar`, {
        method: "POST",
        headers: {
          Accept: "application/json",
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
      const json = await response.text();
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

  async deleteUserProfile(token, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/remove/avtar`, {
        method: "DELETE",
        headers: {
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
      const json = await response.text();
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

  async updateUserProfile(request, token, timeout = 10000) {
    if (request === null) {
      return {
        success: false,
        status: null,
        error: "Request is needed for update the profile!",
      };
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/account/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
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

export default new userService();
