import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import whiteNotFound from '@/assets/icons/404_white.svg';
// import blackNotFound from '@/assets/icons/404_black.svg';

const NotFound = () => {
    return <>
    <div className="h-full w-full flex flex-row justify-center">
        <Helmet>
        <title>404 Не найдено</title>
        <meta name="description" content="404" />
        </Helmet>
        <div>
            <img src={whiteNotFound} className="w-2/3 h-auto" />
        </div>
        <div className='flex flex-col justify-center gap-8'>
            <div className='text-5xl font-bold'><h1>404</h1></div>
            <div className='flex flex-col'>
                <h1 className='font-bold text-xl'>Что-то пошло не так.</h1>
                <p className='text-lg'>Эта страница отсутствует или неправильная ссылка.</p>
            </div>
            <NavLink to="/">
            <div className='text-sky-500 text-lg transition-all duration-300 hover:text-sky-100'>
                <p>Вернуться на главную страницу &gt;</p>
            </div>
            </NavLink>
        </div>
    </div>
    </>

}

export default NotFound;