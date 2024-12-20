import { useNavigate, useParams } from "react-router-dom";
// Hooks
import { useAdminPages } from '../../hooks/adminPanel/useAdminPages.tsx'

interface Params {
    [key: string]: string | undefined;
}

const AdminCreate = () => {
	const { apps } = useParams<Params>();
	if (!apps) {
        return <div>Нет приложений</div>;
    }
	const { data, error, isLoading } = useAdminPages(apps.toLowerCase());
	const navigate = useNavigate();

	const handleOpenSite = () => {
		navigate('/');
	};

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Ошибка при загрузке моделей: {error.message}</div>;
	}

	if (!data || !Array.isArray(data)) {
		return <div>Нет данных для отображения.</div>;
	}

	return <>
	<div className='flex justify-end pb-6'>
		<button
			onClick={handleOpenSite}
			className='uppercase w-auto h-8 px-2 bg-black text-white rounded-lg'>открыть сайт</button>
	</div>
	<div className='flex flex-col bg-black rounded w-full w-height relative'>
		<div className='relative flex justify-between'>
			<div className='pt-10 pl-7 pb-5 text-white text-xs'>
				<p>Добавить {apps}</p>
			</div>
		</div>
		<div className='flex border-b-[0.2px] w-11/12 mx-auto'></div>
		<div className='m-6 overflow-y-auto max-h-96'>
		</div>
	</div>
	</>
}

export default AdminCreate;