import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { AuthProvider } from "./AuthProvider.jsx";
// import AdminPage from "../pages/AdminPage.jsx"; // Trang Admin
// import CustomerPage from "../pages/CustomerPage.jsx"; // Trang Customer
// import LoginPage from "../pages/LoginPage.jsx"; // Trang Đăng Nhập

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        // element: <LoginPage />,
      },
      {
        element: <ProtectedRoute role="Admin" />,
        children: [
          {
            path: "/",
            element: <App />,
          },
        ],
      },
      {
        element: <ProtectedRoute role="Customer" />,
        children: [
          {
            path: "/",
            element: <App />,
          },
        ],
      },
    ],
  },
]);

export default router;
