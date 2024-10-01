import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "./ErrorPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AuthProvider from "./AuthProvider.jsx";
import Login from "../SingUp_Login/LogIn.jsx";
import SignUp from "../SingUp_Login/SignUp.jsx";
import MainAdmin from "../AdminPage/MainAdmin.jsx";
import ListVehicle from "../AdminPage/Vehicle/ListVehicle.jsx";
import DetailVehicle from "../AdminPage/Vehicle/DetailVehicle.jsx";
import CreateVehicle from "../AdminPage/Vehicle/CreateVehicle.jsx";
import EditVehicle from "../AdminPage/Vehicle/EditVehicle.jsx";

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
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/MainAdmin",
        element: (
          <ProtectedRoute role="Admin">
            <MainAdmin />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "ListVehicle",
            element: <ListVehicle />,
          },
          {
            path: "DetailVehicle/:id",
            element: <DetailVehicle />,
          },
          {
            path: "CreateVehicle",
            element: <CreateVehicle />,
          },
          {
            path: "EditVehicle/:id",
            element: <EditVehicle />,
          },
        ],
      },

      {
        path: "/",
        element: (
          <ProtectedRoute role="Customer">
            <App />,
          </ProtectedRoute>
        ),
        children: [{}],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
