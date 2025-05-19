import { Helmet } from 'react-helmet-async';


const Contact = () => {
	return <div className="w-full h-auto flex flex-col md:flex-row px-8">
		<Helmet>
		<title>Contact</title>
		<meta name='description' content='Contact page' />
		</Helmet>
		<div className="basis-2/3">
			<div className="py-10">
				<h1 className="text-3xl md:text-5xl font-bold">Контакт</h1>
			</div>
			<div className="pb-5 grid gap-4">
				<h1 className="text-xl font-bold">Отправить чаевые</h1>
				<p className="text-lg text-justify">Как независимая новостная организация, Investor Home зависит от источников в расследовании важных учреждений. В то время как мы ищем наши источники, чтобы говорить под запись, источники могут иногда полагаться на нас, чтобы защитить свою личность, когда они опасаются негативных последствий за высказывание. Узнайте, как безопасно связаться с журналистами Investor Home, здесь.</p>
			</div>
			<div className="pb-5 grid gap-4">
				<h1 className="text-xl font-bold">Исправления истории</h1>
				<p className="text-lg text-justify">Investor Home придерживается политики быстрого и прозрачного исправления фактических ошибок. Мы также добавляем в истории после их публикации, когда появляется актуальная новая информация. Если вы считаете, что мы опубликовали что-то, что является фактически неверным или иным образом несправедливым, напишите нам.</p>
				<p className="text-lg text-justify">В теме письма укажите «Запрос на исправление». В теле письма укажите ссылку на интересующую вас историю. Предоставьте как можно больше подтверждающих доказательств для вашего запроса на исправление, чтобы мы могли быстро скорректировать истории в случае необходимости.</p>
			</div>
			<div className="pb-5 grid gap-4">
				<h1 className="text-xl font-bold">Фриланс</h1>
				<p className="text-lg text-justify">Команды в нашем отделе новостей работают с фрилансерами.</p>
				<p className="text-lg text-justify">Если вам интересно узнать, как сотрудничать с Investor Home в специальных редакционных проектах, свяжитесь с Булат Насыровым.</p>
			</div>
			<div className="pb-5 grid gap-4">
				<h1 className="text-xl font-bold">Карьера в IH</h1>
				<p className="text-lg text-justify">Если вы хотите узнать больше о работе в Investor Home, ознакомьтесь с полным списком открытых вакансий на нашей странице вакансий .</p>
			</div>
		</div>
		<div className="basis-1/3 md:px-4">
			<h1 className="text-3xl md:text-5xl font-bold py-10 pb-3">Корпоративные контакты</h1>
			<p className="text-xl font-bold">Развитие бизнеса</p>
			<p className="text-lg">admiralgeneral2003@gmail.com</p>
		</div>
	</div>
};


export default Contact;
