import { Component } from 'react';


export default class Home extends Component {
	render() {
		return (
			<div className="bg-white flex flex-col pb-4 py-2 md:py-4 w-full">
				<div className="flex flex-row mx-6">
					<div className="flex flex-col w-3/5 mx-6 font-sans text-xl space-y-4 leading-7">
						<h1 className="uppercase text-3xl"><b>ИНВЕСТИРУЕМ</b> В АКТИВЫ ГЛОБАЛЬНО</h1>
						<p>У меня более чем <b>4-летний опыт работы на финансовых рынках</b> по всему миру. Мы инвестируем в акции, облигации, драгоценные металлы и крипто-активы. Основная цель — прирост капитала и <b>стабильный пассивный денежный поток.</b> Присоединяйтесь к нам, чтобы лучше понимать в какие активы сейчас наиболее выгодно вкладывать капитал!</p>
					</div>
					<div className="flex flex-col w-2/5">
						<img src="http://dummyimage.com/800x600/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
					</div>
				</div>
			</div>
		)
	}
}






