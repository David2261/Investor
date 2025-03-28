import { Helmet } from 'react-helmet-async';


const Payanddelivery = () => {
	return <div className="w-full h-auto py-10">
		<Helmet>
		<title>Pay & Delivery</title>
		<meta name='description' content='Pay & Delivery page' />
		</Helmet>
		<div className="px-10 flex flex-col gap-5 text-xl text-slate-600 text-justify">
			<h1 className="text-5xl pb-5 text-slate-900">Условия доставки и оплаты</h1>
			<p className="text-3xl text-slate-900">Условия оплаты</p>
			<p>Вы можете оплатить свои заказы в режиме он-лайн следующими платежными средствами:</p>
			<p>— Платежное средство «Sofort Banking» — оплата со счетов европейских и британских банков (всего более 20 тыс.). В настоящее время оплата возможна со счетов банков, расположенных в Австрии, Бельгии, Германии, Нидерландах и Великобритании. Валюта счета EUR и GBR</p>
			<p>— Кредитные карты (VISA, MasterCard, DCL, JCB, AmEx) Для карт, выпущенных банками России и СНГ — обработка платежей осуществляется процессинговым центром PayOnline System</p>
			<p>— Cистема электронных платежей Ассист , оплата электронной наличностью (WebMoney, Яндекс.Деньги)</p>
			<p>— Прямой банковский перевод</p>
			<p>— Оплата по безналичному расчету от юрлиц</p>
			<p className="pb-5">Для того, чтобы перейти к выбору способо оплаты, выберите соответствующий товар и нажмите кнопку «Заказать сечас»</p>
			<p className="text-3xl text-slate-900">Условия доставки</p>
			<p>Доставка заказанной продукции осуществляется исключительно в электронном виде на электронный почтовый ящик указанный при оплате. Вся продукция размещенная для продажи на этом сайте выпускается в электронном виде и не имеет физического носителя</p>
		</div>
	</div>
};

export default Payanddelivery
