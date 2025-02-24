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
    if (token === "")
        throw new Error("Token is required for get user posts!");
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
}

export default new userService();
