import { Navigate, createBrowserRouter } from "react-router-dom";
// import Root from "../routes/root";
import Auth from "../routes/auth";
import ErrorPage from "../routes/errorPage";
import Root from "../routes/root";
import MyFacilities from "../routes/myFacilities";
import { ProtectedRoute } from "../components/protectedRoute";
import FacilityDetails from "../routes/FacilityDetails";

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
