import axios from "axios";

const API_URL = "/api";

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || "An error occurred");
    }
    throw new Error("An unknown error occurred");
  }
};
