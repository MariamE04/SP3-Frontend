import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const ProtectedRoute = ({ role }) => {
  const { loggedIn, roles } = useContext(AuthContext);

  const hasRole = roles.toLowerCase().includes(role.toLowerCase());

  if (!loggedIn) return <Navigate to="/login" replace />;
  if (!hasRole) return <h2>Access denied</h2>;

  return <Outlet />; // render nested routes
};

export default ProtectedRoute;
