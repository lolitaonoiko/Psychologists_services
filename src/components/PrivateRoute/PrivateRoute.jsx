import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const location = useLocation();

    return isLoggedIn ? Component : <Navigate to={redirectTo} state={location} />;
};

export default PrivateRoute;
