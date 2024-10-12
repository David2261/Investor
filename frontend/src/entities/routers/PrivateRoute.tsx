import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type children = ReactNode;

const PrivateRoute: React.FC<children> = () => {
    const {user} = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to="/" />
};

export default PrivateRoute;