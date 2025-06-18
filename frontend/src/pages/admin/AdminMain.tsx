import { useNavigate } from "react-router-dom";
// Hooks
import { useAdminArticles } from '@/hooks/adminPanel/useAdminArticles.tsx';
// Components
import AdminTableArticles from '@/components/Admin/Tables/AdminTableArticles.tsx';
// Assets
import '@/styles/pages/admin/AdminMain.module.css';
import SearchBlack from '@/assets/icons/search_black.svg';


const AdminMain = () => {
	const { data: adminArticles, error: articlesError, isLoading: articlesLoding } = useAdminArticles();
	const navigate = useNavigate();

	const handleOpenSite = () => {
		navigate('/');
	};

	if (articlesLoding) {
		return <div>Загрузка...</div>;
	}

	if (articlesError) {
		return <div>Ошибка при загрузке моделей: {articlesError.message}</div>;
	}

	if (!adminArticles || !Array.isArray(adminArticles)) {
		return <div>Нет данных для отображения.</div>;
	}

	return (
		<>
		<div className='flex justify-end pb-6'>
			<button
				onClick={handleOpenSite}
				className='uppercase w-auto h-8 px-2 bg-black text-white rounded-lg'>открыть сайт</button>
		</div>
		<div className='flex flex-col bg-black rounded w-full w-height relative'>
			<div className='relative flex justify-between'>
				<div className='pt-10 pl-7 pb-5 text-white text-xs'>
					<p>Последние статьи</p>
				</div>
				<div className='relative mt-10 mr-7 mb-5'>
					<img
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
						src={SearchBlack}
						alt="Search Icon" />
					<input
						type="text"
						placeholder="Поиск..."
						className='w-full h-full input-placeholder-white rounded-md pl-10' />
				</div>
			</div>
			<div className='flex border-b-[0.2px] w-11/12 mx-auto'></div>
			<div className='m-6 overflow-y-auto max-h-96'>
				<AdminTableArticles data={adminArticles} />
			</div>
		</div>
		</>
	);
}

export default AdminMain;