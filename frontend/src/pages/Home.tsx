import { lazy } from "react";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowRightLong } from "react-icons/fa6";
// Widgets
const NotFound = lazy(() => import('@/widgets/handlerError/404'));
// Types
import { BlogAPIType as Article } from "@/types/Articles";
// Hooks
import useMediaQuery from "@/hooks/useMediaQuery.ts";
import useCompressedQuery from "@/hooks/useCompressedQuery";
// Components
const ContentNews = lazy(() => import('../components/Home/ContentNews'));
const ContentList = lazy(() => import('../components/Home/ContentList'));
const AdvertisingBlock = lazy(() => import('@/components/Home/AdvertisingBlock'));
// Assets
import investmentGlobal from '../assets/pages/invest_global.webp';
import realModel from '../assets/pages/real_and_model.webp';
import liveSituation from '../assets/pages/live_situation.webp';
import eduYourself from '../assets/pages/edu_yourself.webp';
import listArticles from '../assets/pages/mountain.jpg';

const centerContent = `flex justify-center`;

const Home = () => {
	const apiURL = import.meta.env.VITE_API_URL;
	const isAboveMinimumScreens = useMediaQuery("(max-width: 768px)")

	const fetchArticles = async (): Promise<Article[]> => {
		const response = await axios.get(`${apiURL}/api/articles/articles/home/all`, { withCredentials: true });
		return response.data;
	};

	const { data, isLoading, error } = useCompressedQuery<Article[]>(
		'home_articles_compressed',
		fetchArticles,
		{ staleTime: 1000 * 60 * 10 }
	);

	const displayedData = data ? (isAboveMinimumScreens ? data.slice(0, 4) : data) as Article[] : [];

	if (error) {
		return <NotFound />;
	}
	if (!data || isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-white flex flex-col pb-4 py-2 md:py-4 w-full">
			<Helmet>
			<title>Home</title>
			<meta name='description' content='Home page' />
			</Helmet>
			<div className="flex flex-wrap md:flex-nowrap md:flex-row mx-6">
				<div className="flex flex-col md:w-3/5 md:mx-6 font-sans text-xl space-y-4 leading-7">
					<h1 className="uppercase text-3xl md:text-5xl"><b>ИНВЕСТИРУЕМ</b> В АКТИВЫ ГЛОБАЛЬНО</h1>
					<p className="text-justify">У меня более чем <b>4-летний опыт работы на финансовых рынках</b> по всему миру. Мы инвестируем в акции, облигации, драгоценные металлы и крипто-активы. Основная цель — прирост капитала и <b>стабильный пассивный денежный поток.</b> Присоединяйтесь к нам, чтобы лучше понимать в какие активы сейчас наиболее выгодно вкладывать капитал!</p>
				</div>
				<div className="flex flex-col h-full w-full md:w-2/5 md:h-2/5">
					<img className='rounded-xl' src={investmentGlobal} alt="investment_global" />
				</div>
			</div>
			<div className={`${centerContent} mx-6 mt-20 mb-10`} data-name="start-with">
				<h1 className="font-bold uppercase text-5xl" >НАЧНИТЕ С ЭТОГО</h1>
			</div>
			<div className="md:columns-3 sm:flex md:mx-6 mb-10">
				<div className="ml-4 mr-2">
					<div className={`${centerContent} w-full`}><img src={realModel} alt="real_model" loading="lazy"/></div>
					<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Реальные и модельные портфели</p></div>
					<div><p className="font-sans text-lg md:text-xl">Не знаете что покупать в свой портфель? Посмотрите на наши инвестиции</p></div>
				</div>
				<div className="mx-2">
					<div className={`${centerContent}`}><img src={liveSituation} alt="live_situation" loading="lazy"/></div>
					<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Текущая ситуация</p></div>
					<div><p className="font-sans text-lg md:text-xl">Еженедельные обзоры главных тенденций на российских и глобальных финансовых площадках</p></div>
				</div>
				<div className="mr-4 ml-2">
					<div className={`${centerContent}`}><img src={eduYourself} alt="edu_yourself" loading="lazy"/></div>
					<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Прокачайте себя</p></div>
					<div><p className="font-sans text-lg md:text-xl">Инвестируйте сначала в себя, а потом уже в другие активы. Сделайте Upgrade своих навыков</p></div>
				</div>
			</div>
			<div className="bg-neutral-300 relative w-full mb-10">
				<div className="mt-4 mb-4 flex flex-col gap-4 md:grid md:col-span-2">
					<div className={`col-span-2 ${centerContent} my-4`}>
						<h1 className="uppercase font-bold text-2xl text-center">ПОСЛЕДНИЕ ОБЗОРЫ И СТАТЬИ</h1>
					</div>
					<ContentList data={displayedData} />
					<div className={`col-span-2 ${centerContent} my-4`}>
						<NavLink to="news/">
							<button className="bg-green-600 text-white transition-all duration-300 ease-in-out p-3 rounded-md hover:bg-transparent hover:text-black">ВСЕ ПОСЛЕДНИЕ МАТЕРИАЛЫ САЙТА</button>
						</NavLink>
					</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row">
				<div className="relative flex justify-center bg-black basis-2/3 mb-2 rounded-xl md:ml-10">
					<ContentNews data={data} />
				</div>
				<div className="w-full basis-1/3 flex flex-col md:mx-4 justify-center">
					<div className="w-full flex flex-col h-1/2 justify-around rounded-xl bg-[#BAD6D9] pb-2">
						<AdvertisingBlock />
					</div>
					<div className="w-full h-1/2 pt-2">
						<div className='relative'>
						<img className='rounded-xl max-w-full h-auto mx-auto' src={listArticles} alt="posts_image" />
						<div className='text-white border rounded-full absolute top-0 right-4 p-2 mt-4'>25</div>
							<div className='absolute inset-x-0 bottom-0 flex justify-center mb-4'>
								<NavLink to="news/">
									<button className='rounded-full font-bold uppercase p-4 text-xl bg-white text-black flex items-center gap-2 shadow-md transition-all duration-300 ease-in-out hover:text-white hover:bg-transparent'>
										Все статьи <FaArrowRightLong />
									</button>
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;