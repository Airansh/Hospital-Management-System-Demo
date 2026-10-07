// BUSINESS RULES + SECURITY LAYER: only render a page for the roles allowed to see it.

import { Navigate } from 'react-router-dom';
import { getSession } from './session';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, role } = getSession();
  if (!isLoggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
