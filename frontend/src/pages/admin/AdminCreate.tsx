import { useNavigate, useParams } from "react-router-dom";
// Components
import AdminFormCategories from '@/components/Admin/Forms/AdminFormCategories.tsx';
import AdminFormArticles from '@/components/Admin/Forms/AdminFormArticles.tsx';
import AdminFormBonds from '@/components/Admin/Forms/AdminFormBonds.tsx';

interface Params {
    [key: string]: string | undefined;
}

const AdminCreate = () => {
	const { apps } = useParams<Params>();
	const navigate = useNavigate();
	if (!apps) {
        return <div>Нет приложений</div>;
    }
	const handleOpenSite = () => {
		navigate('/');
	};

	let Info = <></>;

	if (apps?.toLowerCase() == 'articles') {
		Info = <AdminFormArticles />
	} else if (apps?.toLowerCase() == 'bonds') {
		Info = <AdminFormBonds />
	} else if (apps?.toLowerCase() == 'user') {
		return
	} else if (apps?.toLowerCase() == 'category') {
		Info = <AdminFormCategories />
	}

	return <>
	<div className='flex justify-end pb-6'>
		<button
			onClick={handleOpenSite}
			className='uppercase w-auto h-8 px-2 bg-black text-white rounded-lg'>открыть сайт</button>
	</div>
	<div className='flex flex-col bg-black rounded w-full relative'>
		<div className='relative flex justify-between'>
			<div className='pt-4 pl-7 font-bold text-white text-lg'>
				<p>Добавить {apps}</p>
			</div>
		</div>
		<div className='flex border-b-[0.2px] w-11/12 mx-auto'></div>
		<div className='m-6 overflow-y-auto max-h-96'>
			{ Info }
		</div>
	</div>
	</>
}

export default AdminCreate;