import { useNavigate, Navigate } from 'react-router-dom';

const PrivateRoute = ({ accessToken, children }) => {
    return accessToken ? children : <Navigate to="/login"/>
};

export default PrivateRoute;
