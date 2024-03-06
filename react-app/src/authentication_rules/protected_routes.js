// BUSINESS RULES

import { useEffect } from 'react';
import { useNavigate, Navigate} from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = sessionStorage.getItem('isLoggedIn'); 

// SECURITY LAYER : access as per role of user
  const userRole = sessionStorage.getItem('role');
  const navigate= useNavigate()

  useEffect(() => {
    if (!isAuthenticated || !allowedRoles.includes(userRole)) {
      navigate('/login'); // Redirect to login if not authenticated or role not allowed
    }
  });

  return isAuthenticated && allowedRoles.includes(userRole) ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;