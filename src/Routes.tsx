import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { AUTH_ROUTES } from "./constants/routesConstants";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: AUTH_ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: AUTH_ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: AUTH_ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
]);
