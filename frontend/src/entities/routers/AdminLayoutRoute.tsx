import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// Hooks
import { useAdminApps } from '../../hooks/adminPanel/useAdminApps.tsx';
import { useAdminModels } from '../../hooks/adminPanel/useAdminModels.tsx';
// Widgets
import Preloader from '../../widgets/preloader.tsx';
// Components
import Sidebar from '../../components/Admin/HomeAdmin/Sidebar.tsx';

const AdminLayoutRoute = () => {
	const { user, loading } = useContext(AuthContext);
	const isAdmin = user?.role === 'admin';
	const { data: adminApps, error: appsError, isLoading: appsLoading } = useAdminApps();
	const { data: adminModels, error: modelsError, isLoading: modelsLoading } = useAdminModels();

	if (loading || user?.role === undefined) {
		return <Preloader />;
	}

	if (appsLoading || modelsLoading) {
		return <div>Загрузка...</div>;
	}

	if (appsError) {
		return <div>Ошибка при загрузке приложений: {appsError.message}</div>;
	}

	if (modelsError) {
		return <div>Ошибка при загрузке моделей: {modelsError.message}</div>;
	}

	if (!adminApps || !adminModels) {
		return <div>Нет данных для отображения.</div>;
	}

	return isAdmin ? (
		<>
			<Preloader />
			<div className="w-screen h-screen flex">
				<aside className="pl-10 basis-1/5 flex flex-col h-screen">
					<Sidebar dataApps={adminApps} dataModels={adminModels} />
				</aside>
				<div className='basis-4/5 flex flex-col mt-8 mr-32 ml-12'>
					<Outlet />
				</div>
			</div>
		</>
	) : (
		<Navigate to="/" />
	);
};

export default AdminLayoutRoute;
