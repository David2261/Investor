import { Key } from "react";

interface DATAItem {
	id: Key,
	title: string
}

const DATA: DATAItem[] = [
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

export default DATA;