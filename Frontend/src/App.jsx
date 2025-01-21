import React from "react";
import Register from "./Componets/Register";
import Login from "./Componets/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./Componets/Profile";
import ForgotPassword from "./Componets/ForgotPassword";
import ForgotpasswordEmail from "./Componets/ForgotpasswordEmail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/forgotPasswordEmail",
      element: <ForgotpasswordEmail />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
App;
