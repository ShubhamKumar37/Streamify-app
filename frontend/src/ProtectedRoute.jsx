import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
//   console.log("ProtectedRoute user:", user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user && user.onBoard === false) {
    return <Navigate to="/onboard" />;
  }

  return children;
};

export default ProtectedRoute;
