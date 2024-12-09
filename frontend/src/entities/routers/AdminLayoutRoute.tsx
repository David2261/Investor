import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// Widgets
import Preloader from '../../widgets/preloader.tsx';

const AdminLayoutRoute = () => {
	const { user, loading } = useContext(AuthContext);
	const isAdmin = user?.role === 'admin';

	if (loading || user?.role === undefined) {
		return <Preloader />;
	}

	return isAdmin ? (
		<>
			<Preloader />
			<Outlet />
		</>
	) : (
		<Navigate to="/" />
	);
};

export default AdminLayoutRoute;
