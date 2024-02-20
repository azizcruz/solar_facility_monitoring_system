import { Navigate, createBrowserRouter } from "react-router-dom";
// import Root from "../routes/root";
import Auth from "../routes/auth";
import ErrorPage from "../routes/errorPage";
import Root from "../routes/root";
import MyFacilities from "../routes/myFacilities";
import { ProtectedRoute } from "../components/protectedRoute";

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
    ],
  },
]);
