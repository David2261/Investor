import { Outlet } from 'react-router-dom';
// Widgets
import Navbar from '../../widgets/Navbar.tsx';
import Footer from '../../widgets/Footer.tsx';
import Preloader from '../../widgets/preloader.tsx';

const LayoutRoute = () => {
    return <>
        <Preloader />
        <Navbar />
        <Outlet />
        <Footer />
    </>
};


export default LayoutRoute;