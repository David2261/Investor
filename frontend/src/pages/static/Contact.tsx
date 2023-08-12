import { useState } from 'react';



const Contact = () => {
	return <div className="w-full h-auto px-20">
		<div className="py-10">
			<h1 className="text-5xl font-bold">Контакт</h1>
		</div>
		<div className="pb-5 flex flex-row">
			<div className="flex flex-col basis-1/2">
				<div className="pb-5 grid gap-4">
					<h1 className="text-xl font-bold">Отправить чаевые</h1>
					<p className="text-lg">Как независимая новостная организация, Investor Home зависит от источников в расследовании важных учреждений. В то время как мы ищем наши источники, чтобы говорить под запись, источники могут иногда полагаться на нас, чтобы защитить свою личность, когда они опасаются негативных последствий за высказывание. Узнайте, как безопасно связаться с журналистами Investor Home, здесь.</p>
				</div>
				<div className="pb-5 grid gap-4">
					<h1 className="text-xl font-bold">Исправления истории</h1>
					<p className="text-lg">Investor Home придерживается политики быстрого и прозрачного исправления фактических ошибок. Мы также добавляем в истории после их публикации, когда появляется актуальная новая информация. Если вы считаете, что мы опубликовали что-то, что является фактически неверным или иным образом несправедливым, напишите нам.</p>
					<p className="text-lg">В теме письма укажите «Запрос на исправление». В теле письма укажите ссылку на интересующую вас историю. Предоставьте как можно больше подтверждающих доказательств для вашего запроса на исправление, чтобы мы могли быстро скорректировать истории в случае необходимости.</p>
				</div>
				<div className="pb-5 grid gap-4">
					<h1 className="text-xl font-bold">Фриланс</h1>
					<p className="text-lg">Команды в нашем отделе новостей работают с фрилансерами.</p>
					<p className="text-lg">Если вам интересно узнать, как сотрудничать с Investor Home в специальных редакционных проектах, свяжитесь с Булат Насыровым.</p>
				</div>
				<div className="pb-5 grid gap-4">
					<h1 className="text-xl font-bold">Карьера в Инсайдер</h1>
					<p className="text-lg">Если вы хотите узнать больше о работе в Investor Home, ознакомьтесь с полным списком открытых вакансий на нашей странице вакансий .</p>
				</div>
			</div>
			<div className="flex flex-col basis-1/2">
				<h1 className="text-2xl font-bold pb-3">Корпоративные контакты</h1>
				<p className="text-xl font-bold">Развитие бизнеса</p>
				<p className="text-lg">admiralgeneral2003@gmail.com</p>
			</div>
		</div>
	</div>
};


export default Contact;
