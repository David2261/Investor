import { Component } from 'react';


const centerContent = `flex justify-center`;
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
						<div className={`${centerContent}`}><p className="text-lg font-bold">Реальные и модельные портфели</p></div>
						<div><p className="font-sans text-xl">Не знаете что покупать в свой портфель? Посмотрите на наши инвестиции</p></div>
					</div>
					<div className="mx-2">
						<div className={`${centerContent}`}><img src="http://dummyimage.com/128x128/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
						<div className={`${centerContent}`}><p className="text-lg font-bold">Текущая ситуация</p></div>
						<div><p className="font-sans text-xl">Еженедельные обзоры главных тенденций на российских и глобальных финансовых площадках</p></div>
					</div>
					<div className="mr-4 ml-2">
						<div className={`${centerContent}`}><img src="http://dummyimage.com/128x128/4d494d/686a82.jepg&text=placeholder+image" alt="placeholder+image" /></div>
						<div className={`${centerContent}`}><p className="text-lg font-bold gap-4">Прокачайте себя</p></div>
						<div><p className="font-sans text-xl">Инвестируйте сначала в себя, а потом уже в другие активы. Сделайте Upgrade своих навыков</p></div>
					</div>
				</div>
			</div>
		)
	}
}






