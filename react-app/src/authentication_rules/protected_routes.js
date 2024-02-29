import { useEffect } from 'react';
import { useNavigate, Navigate} from 'react-router-dom';
import { getIsLoggedIn, getRole } from '../store';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = getIsLoggedIn(); // Replace with your authentication logic
  const userRole = getRole(); // Replace with your logic to retrieve user role
  const navigate= useNavigate()

  useEffect(() => {
    if (!isAuthenticated || !allowedRoles.includes(userRole)) {
      navigate('/login'); // Redirect to login if not authenticated or role not allowed
    }
  });

  return isAuthenticated && allowedRoles.includes(userRole) ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;