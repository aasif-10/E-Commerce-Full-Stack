import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import {
  login,
  logout,
  register,
  verifyOtp,
  generateOtp,
  getMe,
} from "../services/auth-api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const {
    user,
    setUser,
    loading,
    setLoading,
    isVerified,
    setIsVerified,
    error,
    setError,
  } = context;

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await login(email, password);
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      throw error;
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await register(name, email, password);
      setUser(response.user);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await logout();
      setUser(null);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      throw error;
    }
  };

  const handleGenerateOtp = async (email) => {
    try {
      const response = await generateOtp(email);
      return response;
    } catch (error) {
      setError(error.response.data.message);
      throw error;
    }
  };

  const handleVerifyOtp = async (otp, email) => {
    try {
      setLoading(true);
      const response = await verifyOtp(otp, email);
      setIsVerified(response.success);
      setLoading(false);
    } catch (error) {
      setIsVerified(false);
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
      throw error;
    }
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);
      const response = await getMe();
      setUser(response.user);
      setIsVerified(response.user.verified);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setLoading(false);
      throw error;
    }
  };

  return {
    user,
    loading,
    setUser,
    setLoading,
    isVerified,
    setIsVerified,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGenerateOtp,
    handleVerifyOtp,
    handleGetMe,
    error,
    setError,
  };
};
