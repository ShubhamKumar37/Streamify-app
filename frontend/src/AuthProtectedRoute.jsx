import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    console.log("This is the user = ", user);
    if (user) return <Navigate to="/" />
    return children;
}

export default AuthProtectedRoute
