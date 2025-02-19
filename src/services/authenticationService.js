import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/auth";

export const register = async (request) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, {
      fullName: request.fullName,
      email: request.email,
      password: request.password,
      username: request.username,
    });
    return await response.data;
  } catch (error) {
    console.error("Registration Error: " + error);
    throw error.response?.data || error.message;
  }
};
