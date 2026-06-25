import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const generateOtp = async (email) => {
  try {
    const response = await api.post("/api/auth/generate-otp", { email });
    return response.data;
  } catch (error) {
    console.error("Error generating OTP:", error);
    throw error;
  }
};

export const verifyOtp = async (otp, email) => {
  try {
    const response = await api.post("/api/auth/verify-otp", { otp, email });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
