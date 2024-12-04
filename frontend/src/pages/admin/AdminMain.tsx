import { useAdminApps } from '../../hooks/adminPanel/useAdminApps.tsx';
import { useAdminModels } from '../../hooks/adminPanel/useAdminModels.tsx';
// Assets
import Logo from '../../assets/logo/IH.webp';
import SearchWhite from '../../assets/icons/search_white.svg';
import HelpWhite from '../../assets/icons/help_black.svg';
import SettingsWhite from '../../assets/icons/settings_black.svg';

const AdminMain = () => {
	const { data: adminApps, error: appsError, isLoading: appsLoading } = useAdminApps();
	const { data: adminModels, error: modelsError, isLoading: modelsLoading } = useAdminModels();

	if (appsLoading || modelsLoading) {
		return <div>Загрузка...</div>;
	}

	if (appsError) {
		return <div>Ошибка при загрузке приложений: {appsError.message}</div>;
	}

	if (modelsError) {
		return <div>Ошибка при загрузке моделей: {modelsError.message}</div>;
	}

	if (!adminApps || !adminModels || typeof adminModels !== 'object') {
		return <div>Нет данных для отображения.</div>;
	}

	return (
		<div className="w-screen h-screen flex">
			<aside className="pl-10 basis-1/5 flex flex-col h-screen">
				<div className='w-full h-auto pt-8 justify-center'>
					<img src={Logo} className="w-[214px] h-[49px]" />
				</div>
				<div className='mt-8 w-full h-10 relative'>
					<img
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
						src={SearchWhite}
						alt="Search Icon" />
					<input
						type="text"
						placeholder="Поиск..."
						className='bg-black text-white w-full h-full rounded-md pl-10' />
				</div>
				<div className='mt-3 w-full'>
					{adminApps.map((app) => (
                        <div className='mt-4' key={app.name}>
                            <strong>{app.verbose_name}</strong>
                            <ul className='mt-2'>
                                {adminModels[app.name]?.map((model: string) => (
                                    <li key={model}>{model}</li>
                                )) || <li>Нет моделей</li>}
                            </ul>
                        </div>
                    ))}
				</div>
				<div className='mt-auto h-20 flex flex-col'>
					<div className='flex'>
						<img className='mr-5' src={HelpWhite} alt="help_white" />
						<p>Помощь</p>
					</div>
					<div className='flex'>
						<img className='mr-5' src={SettingsWhite} alt="settings_white" />
						<p>Настройка</p>
					</div>
				</div>
			</aside>
			<div className='basis-4/5'></div>
		</div>
	);
}

export default AdminMain;