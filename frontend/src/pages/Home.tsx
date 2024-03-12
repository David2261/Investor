import { useContext } from 'react';
// Components
import ContentNews from '../components/Home/ContentNews';
import ContentPost from '../components/Home/ContentPost';
import ContentList from '../components/Home/ContentList';
// Entities
import AuthContext from '../entities/context/AuthContext';
// Example Data
import DATA from "../alpha_test_data/home_data.json";
import DATANEWS from "../alpha_test_data/home_data_news.json";
import DATAPOSTS from "../alpha_test_data/blog_data_posts.json";


const centerContent = `flex justify-center`;

const Home = () => {
	return (
		<div className="bg-white flex flex-col pb-4 py-2 md:py-4 w-full">
			<div className="flex flex-wrap md:flex-nowrap md:flex-row mx-6">
				<div className="flex flex-col md:w-3/5 md:mx-6 font-sans text-xl space-y-4 leading-7">
					<h1 className="uppercase text-5xl"><b>ИНВЕСТИРУЕМ</b> В АКТИВЫ ГЛОБАЛЬНО</h1>
					<p>У меня более чем <b>4-летний опыт работы на финансовых рынках</b> по всему миру. Мы инвестируем в акции, облигации, драгоценные металлы и крипто-активы. Основная цель — прирост капитала и <b>стабильный пассивный денежный поток.</b> Присоединяйтесь к нам, чтобы лучше понимать в какие активы сейчас наиболее выгодно вкладывать капитал!</p>
				</div>
				<div className="flex flex-col h-full w-full md:w-2/5 md:h-2/5">
					<img src="http://dummyimage.com/800x600/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
				</div>
			</div>
			<div className={`${centerContent} mx-6 mt-20 mb-10`} data-name="start-with">
				<h1 className="font-bold uppercase text-5xl" >НАЧНИТЕ С ЭТОГО</h1>
			</div>
			<div className="columns-3 md:mx-6 mb-10">
				<div className="ml-4 mr-2">
					<div className={`${centerContent} w-full`}><img src="http://dummyimage.com/256x256/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
					<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Реальные и модельные портфели</p></div>
					<div><p className="font-sans text-lg md:text-xl">Не знаете что покупать в свой портфель? Посмотрите на наши инвестиции</p></div>
				</div>
				<div className="mx-2">
					<div className={`${centerContent}`}><img src="http://dummyimage.com/256x256/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
					<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Текущая ситуация</p></div>
					<div><p className="font-sans text-lg md:text-xl">Еженедельные обзоры главных тенденций на российских и глобальных финансовых площадках</p></div>
				</div>
				<div className="mr-4 ml-2">
					<div className={`${centerContent}`}><img src="http://dummyimage.com/256x256/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
					<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Прокачайте себя</p></div>
					<div><p className="font-sans text-lg md:text-xl">Инвестируйте сначала в себя, а потом уже в другие активы. Сделайте Upgrade своих навыков</p></div>
				</div>
			</div>
			<div className="bg-neutral-300 w-full mb-10">
				<div className="w-full grid grid-cols-2 gap-4 mt-4 mb-4">
					<div className={`col-span-2 ${centerContent} my-4`}><h1 className="uppercase font-bold text-2xl">ПОСЛЕДНИЕ ОБЗОРЫ И СТАТЬИ</h1></div>
					<ContentList data={DATA} />
					<div className={`col-span-2 ${centerContent} my-4`}>
						<button className="bg-green-600 text-white p-3 rounded-md hover:bg-slate-500">ВСЕ ПОСЛЕДНИЕ МАТЕРИАЛЫ САЙТА</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 w-full px-2 gap-16 md:gap-20">
				<div className="mt-10 col-span-1 md:col-span-2">
					<div className="w-full flex flex-col md:ml-10">
						<ContentNews data={DATANEWS} />
						<div className="w-full grid grid-cols-2 gap-4">
							<ContentPost data={DATAPOSTS} />
						</div>
					</div>
				</div>
				<div className="flex flex-col mx-4">
					<div className="w-full sm:justify-center">
						<p className="uppercase font-bold text-lg mb-4 border-b-2">POPULAR WITH SUBSCRIBERS</p>
						<img className="h-48 w-auto mb-4" src="http://dummyimage.com/400x300/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
						<p className="uppercase font-bold text-xl hover:underline">Mark Zuckerberg's 'Year of Efficiency' spreads from Meta to Priscilla Chan's charitable organization, which just laid off dozens of people</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;