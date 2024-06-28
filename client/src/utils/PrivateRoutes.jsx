import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ children, user }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
