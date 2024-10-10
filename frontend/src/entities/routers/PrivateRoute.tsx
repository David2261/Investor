import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const {user} = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to="/" />
};

export default PrivateRoute;