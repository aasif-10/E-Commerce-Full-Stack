import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { AuthProvider } from "./features/auth/context/auth-context.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
