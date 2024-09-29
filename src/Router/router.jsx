import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import ErrorPage from "./ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);

export default router;
