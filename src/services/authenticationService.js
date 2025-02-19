class AuthenticationService {
  baseUrl = "http://localhost:8080/api/v1/auth";

  async register(request, timeout = 10000) {
    if (!request) throw new Error("Register request is null");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
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

  async enterBirthDate(username, dateOfBirth, timeout = 10000) {
    if (!username || !dateOfBirth)
      throw new Error("Username and dateOfBirth is required");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const request = new FormData();
      request.append("username", username);
      request.append("dateOfBirth", dateOfBirth);
      const response = await fetch(`${this.baseUrl}/date-of-birth`, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
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

  async accountVerification(username, verificationCode, timeout = 10000) {
    if (!username || !verificationCode)
      throw new Error("Username and verificationCode is required");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/verification/${username}/${verificationCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          signal: controller.signal,
        }
      );
      clearInterval(timeoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Error ${response.status}`);
      }
      return {
        success: true,
        status: response.status,
        // data: response.text(),
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

  async login(request, timeout = 10000) {
    if (!request) throw new Error("AuthenticationRequest is required");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

  async isEmailAddressExist(email, timeout = 10000) {
    if (!email) throw new Error("Email is required");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${this.baseUrl}/exists/email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

  async isExistUsername(username, timeout = 10000) {
    if (!username) throw new Error("Username is required");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/exists/username/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
      if (!response.ok) {
        const error = await response.text();
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

  async forgotPassword(identifier, timeout = 10000) {
    if (!identifier) throw new Error("Email id or phone number is required");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(
        `${this.baseUrl}/forgot-password/${identifier}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
}

export default new AuthenticationService();
