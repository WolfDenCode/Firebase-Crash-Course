import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import AuthRoute from "./components/AuthRoute.jsx";

const handleLogin = (username, password) => {
  console.log("Logging in with:", username, password);
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: (
      <AuthRoute>
        <AdminPanel></AdminPanel>
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginForm onLogin={handleLogin}></LoginForm>,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
