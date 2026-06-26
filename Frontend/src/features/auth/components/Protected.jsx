import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { handleGetMe, user, loading } = useAuth();
  useEffect(() => {
    const getMe = async () => {
      await handleGetMe();
    };
    getMe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/auth/login"}></Navigate>;
  }

  return <div>{children}</div>;
};

export default Protected;
