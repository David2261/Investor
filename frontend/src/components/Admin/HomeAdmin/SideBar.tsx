import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'
// Assets
import '@/styles/pages/admin/AdminMain.css';
import Logo from '@/assets/logo/IH.webp';
import SearchWhite from '@/assets/icons/search_white.svg';
import HelpWhite from '@/assets/icons/help_black.svg';
import SettingsWhite from '@/assets/icons/settings_black.svg';

interface App {
    name: string;
    verbose_name: string;
}

interface SideBarProps {
    dataApps: App[];
    dataModels: Record<string, string[]>;
}

const Sidebar: FunctionComponent<SideBarProps> = ({ dataApps, dataModels }) => {
	const location = useLocation();
	const adminApps = dataApps;
	const adminModels = dataModels;

	const helpClick = () => {
		Swal.fire({
			title: 'Помощь',
			text: 'Закрой окно, все вопросы к разработчику!',
			icon: 'question',
			confirmButtonText: 'ОК'
		});
	};

	const settingClick = () => {
		Swal.fire({
			title: 'Настройка',
			text: 'Сейчас находиться в разработке!',
			icon: 'info',
			confirmButtonText: 'ОК'
		});
	};

	return <>
		<div className='w-full h-auto pt-8 justify-center'>
			<Link to="/admin/main">
				<img src={Logo} className="w-[214px] h-[49px]" />
			</Link>
		</div>
		<div className='mt-8 w-full h-10 relative'>
			<img
				className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
				src={SearchWhite}
				alt="Search Icon" />
			<input
				type="text"
				placeholder="Поиск..."
				className='bg-black text-white input-placeholder w-full h-full rounded-md pl-10' />
		</div>
		<div className='mt-3 w-full overflow-y-auto' style={{ maxHeight: 'calc(100vh - 200px)' }} >
			{adminApps.map((app) => (
				<div className='mt-4' key={app.name}>
					<strong>{app.verbose_name}</strong>
					<ul className='mt-2'>
						{adminModels[app.name]?.map((model: string) => {
							const isActive = location.pathname === `/admin/main/${model}`;
							return (
								<Link to={`/admin/main/${model}`} key={model}>
									<li className={isActive ? 'bg-black text-white rounded px-2 py-2' : 'px-2 py-2'}>Добавить {model}</li>
								</Link>
							);
						}) || <li>Нет моделей</li>}
					</ul>
				</div>
			))}
		</div>
		<div className='mt-auto h-20 flex flex-col pt-4'>
			<div className='flex cursor-pointer' onClick={helpClick}>
				<img className='mr-5' src={HelpWhite} alt="help_white" />
				<p>Помощь</p>
			</div>
			<div className='flex cursor-pointer' onClick={settingClick}>
				<img className='mr-5' src={SettingsWhite} alt="settings_white" />
				<p>Настройка</p>
			</div>
		</div>
	</>
}

export default Sidebar;