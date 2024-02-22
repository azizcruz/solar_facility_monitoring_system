import { Navigate, createBrowserRouter } from "react-router-dom";

import FacilityDetails from "../routes/FacilityDetails";
import ProtectedRoute from "../components/ProtectedRoute";
import Auth from "../routes/Auth";
import ErrorPage from "../routes/ErrorPage";
import Root from "../routes/Root";
import MyFacilities from "../routes/MyFacilities";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Root />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MyFacilities />,
        errorElement: <ErrorPage />,
      },
      {
        path: "facility-details/:id",
        element: <ProtectedRoute element={<FacilityDetails />} />,
        errorElement: <ErrorPage />,
        id: "facility-details",
      },
    ],
  },
]);
