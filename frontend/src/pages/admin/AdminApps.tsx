import { useNavigate, useParams } from "react-router-dom";
// Hooks
import { useAdminPages } from '@/hooks/adminPanel/useAdminPages.tsx'
// Components
import AdminTableArticles from '@/components/Admin/Tables/AdminTableArticles.tsx';
import AdminTableBonds from '@/components/Admin/Tables/AdminTableBonds.tsx';
import AdminTableUsers from '@/components/Admin/Tables/AdminTableUsers.tsx';
import AdminTableCategories from '@/components/Admin/Tables/AdminTableCategories.tsx';
// Widgets
import AdminButton from '@/widgets/buttons/AdminButton.tsx';
import AdminSearch from '@/widgets/buttons/AdminSearch.tsx';
// Assets
import '@/styles/pages/admin/AdminMain.css';

interface Params {
	[key: string]: string | undefined;
}

const AdminApps = () => {
	const { apps } = useParams<Params>();
	const navigate = useNavigate();
	const { data, error, isLoading } = useAdminPages(apps ? apps.toLowerCase() : "");

	const handleOpenSite = () => {
		navigate('/');
	};

	const handleOpenUpload = () => {
		navigate(`/admin/main/${apps}/upload`);
	};

	const handleOpenCreate = () => {
        navigate(`/admin/main/${apps}/create`);
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

	let Info = <></>;
	let TitleButton = "";
	let UploadButton = ""

	if (apps?.toLowerCase() == 'articles') {
		Info = <AdminTableArticles data={data} />
		TitleButton = "добавить статью"
		UploadButton = "загрузить статьи"
	} else if (apps?.toLowerCase() == 'bonds') {
		Info = <AdminTableBonds data={data} />
		TitleButton = "добавить облигацию"
		UploadButton = "загрузить облигации"
	} else if (apps?.toLowerCase() == 'user') {
		Info = <AdminTableUsers data={data} />
		TitleButton = "добавить пользователя"
		UploadButton = "загрузить пользователей"
	} else if (apps?.toLowerCase() == 'category') {
		Info = <AdminTableCategories data={data} />
		TitleButton = "добавить категорию"
		UploadButton = "загрузить категории"
	}

	return <>
	<div className='flex justify-end pb-6'>
		<button
			onClick={handleOpenSite}
			className='uppercase w-auto h-8 px-2 bg-black text-white rounded-lg'>открыть сайт</button>
	</div>
	<div className='flex flex-col bg-black rounded w-full w-height relative'>
		<div className='relative flex justify-between'>
			<div className='pt-8 text-lg pl-7 text-white'>
				<p>Выберите {apps} для изменения</p>
			</div>
			<div className="mt-4">
				<AdminButton onClick={handleOpenUpload} children={UploadButton} />
			</div>
			<div className="mt-4">
				<AdminButton onClick={handleOpenCreate} children={TitleButton} />
			</div>
			<div className='mt-8 mr-7'>
				<AdminSearch />
			</div>
		</div>
		<div className='flex border-b-[0.2px] w-11/12 mx-auto'></div>
		<div className='m-6 overflow-y-auto max-h-96 min-h-48'>
			{ Info }
		</div>
	</div>
	</>
}

export default AdminApps;