import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    console.log(user);
    if (!user) {
        return <Navigate to="/login" />
    }
    else if(user && user.onboard === true) return children;
}

export default ProtectedRoute
