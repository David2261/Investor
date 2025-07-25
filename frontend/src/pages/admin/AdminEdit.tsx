import { useNavigate, useParams } from "react-router-dom";
// Components
import AdminEditFormArticles from '@/components/Admin/EditForms/AdminEditFormArticles.tsx';
import AdminEditFormBonds from '@/components/Admin/EditForms/AdminEditFormBonds.tsx';
import UnderConstruction from '@/components/Admin/HomeAdmin/UnderPage.tsx';

interface Params {
    [key: string]: string | undefined;
}

const AdminCreate = () => {
    const { apps } = useParams<Params>();
    const navigate = useNavigate();
    if (!apps) {
        return <div>Нет приложений</div>;
    }
    // const commonProps = {
    //     mode: 'edit' as 'edit',
    //     itemId: id,
    // };
    const handleOpenSite = () => {
        navigate('/');
    };

    let Info = <></>;

    switch (apps.toLowerCase()) {
    case 'articles':
      Info = <AdminEditFormArticles />;
      break;
    case 'bonds':
      Info = <AdminEditFormBonds />;
      break;
    case 'user':
      Info = <UnderConstruction />;
      break;
    default:
      Info = <div>Форма не найдена</div>;
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