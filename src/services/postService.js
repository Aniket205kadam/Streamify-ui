class postService {
  baseUrl = "http://localhost:8080/api/v1/posts";
  mediaUrl = "http://localhost:8080/api/v1/media";

  async uploadPostContent(contents, token, timeout = 10000) {
    if (contents === null)
      throw new Error("Contents is required for upload the post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const request = new FormData();
      if (Array.isArray(contents))
        contents.map((file) => request.append("contents", file));
      else request.append("contents", contents);

      const response = await fetch(`${this.baseUrl}/contents`, {
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

  async uploadPostMetaData(request, token, timeout = 10000) {
    if (!request)
      throw new Error("PostRequest is required for upload the post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${request.id}/meta-data`, {
        method: "POST",
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

  async updateHideLikeCount(postId, timeout = 10000) {
    if (postId === null || postId === "")
      throw new Error("Post Id is requried to update post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${postId}/hide/like-count`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
        data: response.text(),
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

  async updateCommenting(postId, timeout = 10000) {
    if (postId === null || postId === "")
      throw new Error("Post Id is required for update post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/${postId}/hide/commenting`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
        data: response.text(),
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

  async getPostById(postId, token, timeout = 10000) {
    if ((postId === null, postId === ""))
      throw new Error("Post Id is required for get the post details!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        signal: controller.signal,
      });
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

  async getPostMediaImagePreview(postId, token, timeout = 40000) {
    if ((postId === null, postId === ""))
      throw new Error("Post Id is required for get preview of post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.mediaUrl}/post/preview/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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

  async getFollowingsPosts(page, size, token, timeout = 10000) {
    if (token === "" || token === null)
      throw new Error("Auth token is required to get the posts!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/followings-posts?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        }
      );
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

  async getPostMedia(postMediaId, token, timeout = 10000) {
    if (postMediaId === "" || postMediaId === null)
      throw new Error("PostMediaId is required for get the post content!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.mediaUrl}/post/${postMediaId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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

  async isLikedPost(postId, token, timeout = 20000) {
    if (postId === "" || postId === null)
      throw new Error("PostId is required for get the post likes info!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${postId}/isLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      const responseText = await response.text();
      const isLiked = responseText === "true";
      return {
        success: true,
        status: response.status,
        data: isLiked,
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async isSavedPost(postId, token, timeout = 20000) {
    if (postId === "" || postId === null)
      throw new Error("PostId is required for get the saved post info!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${postId}/isSaved`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      const responseText = await response.text();
      const isLiked = responseText === "true";
      return {
        success: true,
        status: response.status,
        data: isLiked,
      };
    } catch (error) {
      return {
        success: false,
        status: null,
        error:
          error.name === "AbortError" ? "Request timed out" : error.message,
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async likePost(postId, token, timeout = 20000) {
    if (postId === "" || postId === null)
      throw new Error("PostId is required if you can to like this post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${postId}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async savePost(postId, token, timeout = 20000) {
    if (postId === "" || postId === null)
      throw new Error("PostId is required if you can to save this post!");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/${postId}/save`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async getExploreContent(page, size, token, timeout = 20000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/explore?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async getReels(page, size, token, timeout = 20000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/reels?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async getSuggestedPost(token, timeout = 20000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/suggested-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
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
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export default new postService();
