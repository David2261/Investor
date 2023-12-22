import { Component, Fragment, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import DATA from '/src/alpha_test_data/home_data.tsx';
import DATANEWS from '/src/alpha_test_data/home_data_news.tsx';
import DATAPOSTS from '/src/alpha_test_data/home_data_posts.tsx';

const centerContent = `flex justify-center`;


const contentList = DATA.map((value: {
	id: Key;
	title: string;
}) => 
	// return <div><ContentPost title={value.title} /></div>;
	<Fragment key={value.id}>
		<div className="ml-10"><p className="text-xl hover:text-slate-700">{value.title}</p></div>
	</Fragment>
);


const ContentNews = DATANEWS.map((value: {
	id: Key;
	category: string;
	title: string;
}) =>
	<Fragment key={value.id}>
		<div className="border-t-2 w-full relative">
			<div className="absolute left-0 top-0">
				<h3 className="font-sans font-medium text-2xl md:text-3xl mb-4">{value.category}</h3>
			</div>
			<div className="absolute right-4 top-0 hover:right-0 transition-all ease-in-out delay-150">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</div>
		</div>
		<div className="w-full mt-10 mb-4">
			<p className="left-0 top-0 uppercase text-sky-500">{value.category}</p>
		</div>
		<div className="w-full mb-4">
			<h2 className="font-bold text-lg md:text-xl md:text-2xl hover:underline">{value.title}</h2>
		</div>
		<div className="w-full pb-6 border-b-2">
			<img className="object-cover w-full h-auto" src="http://dummyimage.com/600x300/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
		</div>
	</Fragment>
);

const ContentPost = DATAPOSTS.map((value: {
	id: Key;
	category: string;
	title: string;
	text: string;
	img: string | undefined; }) =>
	<Fragment key={value.id}>
		<div className="w-full flex flex-col">
			<p className="text-lg uppercase text-sky-500">{value.category}</p>
			<p className="text-lg font-bold">{value.title}</p>
			<p className="text-lg text-slate-700">{value.text}</p>
			<img className="w-full h-auto pb-4 border-b-2" src={value.img} alt="" />
		</div>
	</Fragment>
);


export default class Home extends Component {

	render() {
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
				<div className={`${centerContent} mx-6 mt-20 mb-10`}>
					<h1 className="font-bold uppercase text-5xl">НАЧНИТЕ С ЭТОГО</h1>
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
						{contentList}
						<div className={`col-span-2 ${centerContent} my-4`}>
							<button className="bg-green-600 text-white p-3 rounded-md hover:bg-slate-500">ВСЕ ПОСЛЕДНИЕ МАТЕРИАЛЫ САЙТА</button>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 w-full px-2 gap-16 md:gap-20">
					<div className="mt-10 col-span-1 md:col-span-2">
						<div className="w-full flex flex-col md:ml-10">
							{ContentNews}
							<div className="w-full grid grid-cols-2 gap-4">
								{ ContentPost }
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
}






