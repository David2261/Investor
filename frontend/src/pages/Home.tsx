import { Component, Fragment } from 'react';


const centerContent = `flex justify-center`;


const DATA = [
	{
		id: 1,
		title: "Philip Morris (PM): отчет за 2 кв. 2023 г. Лучший в своем роде"
	},
	{
		id: 2,
		title: "Ленэнерго: отчет за 2 кв. 2023 по РСБУ. Рекордные дивиденды зреют"
	},
	{
		id: 3,
		title: "РусАгро: отчет за 2 кв. 2023 по МСФО. Скоро укрупнение в показателях"
	},
	{
		id: 4,
		title: "Apple (AAPl): отчет за 3 кв. ф.г. Мечты яблочников об автомобиле"
	},
	{
		id: 5,
		title: "Newmont (NEM): отчет за 2 кв. 2023 г. Что не так с золотодобытчиками?"
	},
	{
		id: 6,
		title: "Ростелеком: отчет за 2 кв. 2023 по МСФО. Раскрытие вернулось!"
	},
	{
		id: 7,
		title: "Сбербанк: отчет за 2 кв. 2023 по МСФО. Лидер в форме!"
	},
	{
		id: 8,
		title: "Pfizer, Merck, Exxon Mobile, новый китайский портфель активов"
	}
];

const DATANEWS = [
	{
		id: 1,
		category: 'Markets',
		title: 'Bearish investor Boaz Weinstein is feeling the pain from this year\'s unexpected stock rally'
	},
];

const contentList = DATA.map(value => 
	// return <div><ContentPost title={value.title} /></div>;
	<Fragment key={value.id}>
		<div className="ml-10"><p className="text-xl hover:text-slate-700">{value.title}</p></div>
	</Fragment>
);


const ContentNews = DATANEWS.map(value =>
	<Fragment key={value.id}>
		<div className="border-t-2 w-full relative">
			<div className="absolute left-0 top-0">
				<h3 className="font-sans font-medium text-3xl mb-4">{value.category}</h3>
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
			<h2 className="font-bold text-2xl hover:underline">{value.title}</h2>
		</div>
		<div className="w-full mb-6">
			<img className="object-cover w-auto h-auto" src="http://dummyimage.com/600x300/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
		</div>
	</Fragment>
);


export default class Home extends Component {

	render() {
		return (
			<div className="bg-white flex flex-col pb-4 py-2 md:py-4 w-full">
				<div className="flex flex-row mx-6">
					<div className="flex flex-col w-3/5 mx-6 font-sans text-xl space-y-4 leading-7">
						<h1 className="uppercase text-5xl"><b>ИНВЕСТИРУЕМ</b> В АКТИВЫ ГЛОБАЛЬНО</h1>
						<p>У меня более чем <b>4-летний опыт работы на финансовых рынках</b> по всему миру. Мы инвестируем в акции, облигации, драгоценные металлы и крипто-активы. Основная цель — прирост капитала и <b>стабильный пассивный денежный поток.</b> Присоединяйтесь к нам, чтобы лучше понимать в какие активы сейчас наиболее выгодно вкладывать капитал!</p>
					</div>
					<div className="flex flex-col w-2/5">
						<img src="http://dummyimage.com/800x600/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
					</div>
				</div>
				<div className={`${centerContent} mx-6 mt-20 mb-10`}>
					<h1 className="font-bold uppercase text-5xl">НАЧНИТЕ С ЭТОГО</h1>
				</div>
				<div className="columns-3 mx-6 mb-10">
					<div className="ml-4 mr-2">
						<div className={`${centerContent}`}><img src="http://dummyimage.com/128x128/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
						<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Реальные и модельные портфели</p></div>
						<div><p className="font-sans text-xl">Не знаете что покупать в свой портфель? Посмотрите на наши инвестиции</p></div>
					</div>
					<div className="mx-2">
						<div className={`${centerContent}`}><img src="http://dummyimage.com/128x128/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
						<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Текущая ситуация</p></div>
						<div><p className="font-sans text-xl">Еженедельные обзоры главных тенденций на российских и глобальных финансовых площадках</p></div>
					</div>
					<div className="mr-4 ml-2">
						<div className={`${centerContent}`}><img src="http://dummyimage.com/128x128/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
						<div className={`${centerContent}`}><p className="text-lg font-bold hover:text-slate-700">Прокачайте себя</p></div>
						<div><p className="font-sans text-xl">Инвестируйте сначала в себя, а потом уже в другие активы. Сделайте Upgrade своих навыков</p></div>
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
				<div className="grid grid-cols-3 w-full gap-20">
					<div className="mt-10 col-span-2">
						<div className="w-full flex flex-col ml-10 border-b-2">
							{ContentNews}
						</div>
					</div>
					<div className="flex flex-col mx-4">
						<div className="w-full">
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






