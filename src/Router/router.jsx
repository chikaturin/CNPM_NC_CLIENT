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
import ListDriver from "../AdminPage/Driver/ListDriver.jsx";
import DetailDriver from "../AdminPage/Driver/DetailDriver.jsx";
import EditDriver from "../AdminPage/Driver/EditDriver.jsx";
import CreateDriver from "../AdminPage/Driver/CreateDriver.jsx";
import ListAccount from "../AdminPage/Account/ListAccount.jsx";
import ListContract from "../AdminPage/Contract/ListContract.jsx";
import DetailContract from "../AdminPage/Contract/DetailContract.jsx";
import ListReservation from "../AdminPage/Reservation/ListReservation.jsx";
import Dashboard from "../AdminPage/Dashboard/Dashboard.jsx";
import Home from "../CustomerPage/Home.jsx";
import CarDetail from "../CustomerPage/CarDetail.jsx";
import CarList from "../CustomerPage/CarList.jsx";
import DemiseCar from "../CustomerPage/DemiseCar.jsx";
import History from "../CustomerPage/History.jsx";
import Reservation from "../CustomerPage/Reservation.jsx";
import Payment from "../CustomerPage/Payment.jsx";

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
          {
            path: "ListDriver",
            element: <ListDriver />,
          },
          {
            path: "DetailDriver/:id",
            element: <DetailDriver />,
          },
          {
            path: "DetailDriver/:id",
            element: <DetailDriver />,
          },
          {
            path: "EditDriver/:id",
            element: <EditDriver />,
          },
          {
            path: "CreateDriver",
            element: <CreateDriver />,
          },
          {
            path: "ListAccount",
            element: <ListAccount />,
          },
          {
            path: "ListContract",
            element: <ListContract />,
          },
          {
            path: "DetailContract/:id",
            element: <DetailContract />,
          },
          {
            path: "ListReservation",
            element: <ListReservation />,
          },
          {
            path: "Dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/",
        element: (
          <ProtectedRoute role="Customer">
            <App />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "Home",
            element: <Home />,
          },
          {
            path: "CarDetail/:id",
            element: <CarDetail />,
          },
          {
            path: "CarList",
            element: <CarList />,
          },
          {
            path: "DemiseCar",
            element: <DemiseCar />,
          },
          {
            path: "History",
            element: <History />,
          },
          {
            path: "Reservation/:id",
            element: <Reservation />,
          },
          {
            path: "Payment/:id",
            element: <Payment />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
