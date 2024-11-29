import { Outlet } from 'react-router-dom';
// Widgets
import Preloader from '../../widgets/preloader.tsx';

const AdminLayoutRoute = () => {
    return <>
        <Preloader />
        <Outlet />
    </>
};


export default AdminLayoutRoute;