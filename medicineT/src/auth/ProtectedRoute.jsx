import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { loggedIn, roles } = useContext(AuthContext);

  if (!loggedIn) return <Navigate to="/login" replace />;

  if (role && !roles.toLowerCase().includes(role.toLowerCase())) {
    return <h2>Access denied</h2>;
  }

  return <Outlet />;
};


export default ProtectedRoute;
