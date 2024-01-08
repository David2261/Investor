

const About = () => {
	return <div className="w-full h-auto flex flex-col pb-4 justify-center">
		<div className="w-full bg-slate-100 pb-4 px-4">
			<div className="py-32"><p className="uppercase text-center text-4xl">ЭТОТ ПРОЕКТ О ТОМ:</p></div>
		</div>
		<div className="py-12 grid grid-cols-3">
			<div className="pl-6 pr-4">
				<p className="uppercase text-2xl">КАК С ПОМОЩЬЮ ИНВЕСТИЦИЙ ЖИТЬ ПОЛНОЙ ЖИЗНЬЮ</p>
			</div>
			<div className="col-span-2 pl-2 pr-6">
				<p className="text-xl">Данный проект создан для того, чтобы демонстрировать как с помощью систематического вложения денежных средств на фондовый рынок можно добиться двух главных целей частного инвестора – роста капитала (намного превышающего банковский депозит) и получения постоянного денежного потока в виде дивидендов, на которые можно жить не работая</p>
			</div>
		</div>
		<div className="bg-neutral-950 w-full px-6 py-6">
			<div className="py-10 flex flex-row">
				<div className="w-full px-4 flex flex-col">
					<img src="http://dummyimage.com/800x700/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
					<p className="font-bold text-white">Основатель проекта</p>
				</div>
				<div className="px-10 flex flex-col gap-4 text-justify">
					<p className="text-white text-xl"><strong>Булат Насыров</strong> работает на международных финансовых рынках с 2005 года, начав инвестировать еще с университетской скамьи. В 2008 году он занимает 3 место среди 280 участников конкурса «Лучший Частный Инвестор», проводимой биржей РТС, с общим доходом за период конкурса в 1204%. Тем самым увеличив свой счет на бирже более чем в 12 раз.</p>
					<p className="text-white text-xl">В 2012 году участвует в конкурсе «Битва трейдеров», проводимой Московской Биржей, и занимает в общем зачете 2 место среди лучших трейдеров СНГ.</p>
					<p className="text-white text-xl">Дмитрий является аттестованным специалистом Федеральной Службы по Финансовым Рынкам России (ФСФР 1.0), имеет многолетний опыт работы в инвестиционно-банковских (Альфа-Капитал, Альфа-Банк) и брокерских (Открытие Брокер) компаниях. Проходил торговую практику в течение длительного периода в Чикаго (США), где совершенствовал мастерство в торговле производными инструментами на бирже CBOE (Chicago Board Options Exchange)</p>
					<p className="text-white text-xl">Владелец нескольких образовательных проектов для трейдеров, таких как DC Trading и XELIUS GROUP.</p>
					<p className="text-white text-xl">На данный момент большую часть своего времени посвящает поиску инвестиционных возможностей на организованных финансовых площадках по всему миру.</p>
				</div>
			</div>
		</div>
		<div className="py-12 px-10">
			<div className="bg-slate-100 rounded-md px-2 py-2">
				<p className="italic text-gray text-xl">&#171;Покупай, когда остальные продают, и удерживай до тех пор, пока кто-нибудь не захочет это купить. Это не просто лозунг. Это суть успешного инвестирования.&#187;</p>
			</div>
			<div className="py-4 px-2 flex flex-row">
				<img className="rounded-full" src="http://dummyimage.com/50x50/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
				<div className="px-4 flex flex-col">
					<p className="font-bold text-lg">Пол Гетти (J. Paul Getty)</p>
					<p className="text-gray font-light text-sm">Американский промышленник, один из первых в истории долларовых миллиардеров</p>
				</div>
			</div>
		</div>
		<div className="py-10 px-10">
			<div className="flex justify-center">
				<p className="font-bold text-2xl">Основные цели проекта</p>
			</div>
			<div className="py-4 grid grid-cols-3 gap-10">
				<div className="flex flex-col justify-center gap-5">
					<img className="rounded-md" src="http://dummyimage.com/200x150/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
					<p className="text-xl text-center">Дивиденды</p>
					<p className="font-light text-center">Поиск компаний, которые платят стабильно высокие дивиденды акционерам</p>
				</div>
				<div className="flex flex-col justify-center gap-5">
					<img className="rounded-md" src="http://dummyimage.com/200x150/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
					<p className="text-xl text-center">Инвестирование</p>
					<p className="font-light text-center">Поиск и инвестирование в недооцененные компании с большим потенциалом</p>
				</div>
				<div className="flex flex-col justify-center gap-5">
					<img className="rounded-md" src="http://dummyimage.com/200x150/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
					<p className="text-xl text-center">Обучение</p>
					<p className="font-light text-center">Помощь людям, которые только начинают свой путь в инвестировании</p>
				</div>
			</div>
		</div>
	</div>
};

export default About;
