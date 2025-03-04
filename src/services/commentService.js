class commentService {
  baseUrl = "http://localhost:8080/api/v1/posts";

  async sendComment(postId, content, token, timeout = 20000) {
    if (postId === null)
      throw new Error("Post ID is required to send the comment");
    if (content === "") throw new Error("Empty comment is not posted!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const formData = new FormData();
      formData.append("content", content);

      const response = await fetch(`${this.baseUrl}/${postId}/comment`, {
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
        response: await response.text(),
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

  async getCommentsOnPost(postId, token, timeout = 20000) {
    if (postId === null)
      throw new Error("Post ID is required to send the comment");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${postId}/comments`, {
        method: "GET",
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
      return {
        success: true,
        status: response.status,
        response: await response.json(),
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

  async likeComment(commentId, token, timeout = 20000) {
    if (commentId === null)
      throw new Error("Comment ID is required to like the comment");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/comment/${commentId}/like`, {
        method: "PATCH",
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
      return {
        success: true,
        status: response.status,
        response: await response.text(),
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

  async isLikedComment(commentId, token, timeout = 20000) {
    if (commentId === null)
      throw new Error("Comment ID is required!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/comment/${commentId}/isLiked`, {
        method: "GET",
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
      const responseText = await response.text();
      const isLiked = responseText === "true";
      return {
        success: true,
        status: response.status,
        response: isLiked,
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

export default new commentService();
