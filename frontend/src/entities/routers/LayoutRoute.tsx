import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// Widgets
import Navbar from '@/widgets/Navbar.tsx';
import Footer from '@/widgets/Footer.tsx';
import Preloader from '@/widgets/preloader.tsx';
import "react-toastify/ReactToastify.css";

const LayoutRoute = () => {
    return <>
        <Preloader />
        <Navbar />
        <Outlet />
        <ToastContainer />
        <Footer />
    </>
};


export default LayoutRoute;