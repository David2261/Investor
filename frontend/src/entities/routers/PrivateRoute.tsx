import { useContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children}) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/" />
};

export default PrivateRoute;