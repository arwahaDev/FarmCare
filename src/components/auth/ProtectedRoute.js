import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../../app/redux/selectors";

export default function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  // Check login status
  if (!isAuthenticated || !currentUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Check user role
  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}