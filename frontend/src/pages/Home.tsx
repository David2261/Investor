import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
// Components
import ContentNews from '../components/Home/ContentNews';
import ContentPost from '../components/Home/ContentPost';
import ContentList from '../components/Home/ContentList';
// Widgets
import { getRandomImage } from '../widgets/getRandomImage';
// Assets
import investmentGlobal from '../assets/pages/invest_global.webp';
import realModel from '../assets/pages/real_and_model.webp';
import liveSituation from '../assets/pages/live_situation.webp';
import eduYourself from '../assets/pages/edu_yourself.webp';


const centerContent = `flex justify-center`;

const Home = () => {
	const apiURL = import.meta.env.VITE_API_URL;
	const { data, error, isLoading } = useQuery({
		queryKey: ['articles'],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/articles/articles/home/all`);
			return response.data;
		},
	});

	if (error) {
		return <div>Error: {error.message}</div>;
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
					<h1 className="uppercase text-5xl"><b>ИНВЕСТИРУЕМ</b> В АКТИВЫ ГЛОБАЛЬНО</h1>
					<p>У меня более чем <b>4-летний опыт работы на финансовых рынках</b> по всему миру. Мы инвестируем в акции, облигации, драгоценные металлы и крипто-активы. Основная цель — прирост капитала и <b>стабильный пассивный денежный поток.</b> Присоединяйтесь к нам, чтобы лучше понимать в какие активы сейчас наиболее выгодно вкладывать капитал!</p>
				</div>
				<div className="flex flex-col h-full w-full md:w-2/5 md:h-2/5">
					<img src={investmentGlobal} alt="investment_global" />
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
			<div className="bg-neutral-300 w-full mb-10">
				<div className="w-full grid md:grid-cols-2 gap-4 mt-4 mb-4">
					<div className={`col-span-2 ${centerContent} my-4`}><h1 className="uppercase font-bold text-2xl">ПОСЛЕДНИЕ ОБЗОРЫ И СТАТЬИ</h1></div>
					<ContentList data={data} />
					<div className={`col-span-2 ${centerContent} my-4`}>
						<NavLink to="news/">
							<button className="bg-green-600 text-white p-3 rounded-md hover:bg-slate-500">ВСЕ ПОСЛЕДНИЕ МАТЕРИАЛЫ САЙТА</button>
						</NavLink>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 w-full px-2 gap-16 md:gap-20">
				<div className="mt-10 col-span-1 md:col-span-2">
					<div className="w-full flex flex-col md:ml-10">
						<ContentNews data={data} />
						<div className="w-full grid grid-cols-2 gap-4">
							<ContentPost data={data} />
						</div>
					</div>
				</div>
				<div className="flex flex-col mx-4">
					<div className="w-full sm:justify-center">
						{/* Favorite post */}
						{/* <p className="uppercase font-bold text-lg mb-4 border-b-2">POPULAR WITH SUBSCRIBERS</p>
						<img className="h-48 w-auto mb-4" src="http://dummyimage.com/400x300/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
						<p className="uppercase font-bold text-xl hover:underline">Mark Zuckerberg's 'Year of Efficiency' spreads from Meta to Priscilla Chan's charitable organization, which just laid off dozens of people</p> */}
						{/* Adverts */}
						<h1 className='uppercase font-bold text-lg mb-4 border-b-2'>Реклама</h1>
						<img className='h-48 w-auto mb-4' src={getRandomImage()} alt="ad_donate" loading="lazy"/>
						<a href="https://new.donatepay.ru/@1097922" target='_blank' rel="noopener noreferrer">
							<p className="uppercase font-bold text-xl hover:underline">
								Ваша поддержка значит для меня очень много!<br />
								Пожертвование
							</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;