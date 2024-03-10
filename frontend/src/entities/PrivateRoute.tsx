import { Route, redirect } from 'react-router-dom';


const PrivateRoute = ({children, ...rest}) => {
    console.log("Private method is working");
    return (
        <Route {...rest}>{children}</Route>
    )
}

export default PrivateRoute;