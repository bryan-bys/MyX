import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";

export const PrivateRoutes = ({ children, user }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={<Login />} />;
  } else {
    return <Outlet />;
  }
};
