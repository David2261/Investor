import { useContext, ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type PrivateRouteProps = {
    children: ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest}) => {
    const { user } = useContext(AuthContext);
    return <Route {...rest}>{user ? children : <Navigate to="/" />}</Route>
};

export default PrivateRoute;