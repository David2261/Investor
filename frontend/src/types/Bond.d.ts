export interface Bond {
	id: 0;
	title: string;            // Название облигации
	description: string;      // Описание облигации
	category: string;       // Категория облигации
	price: number;            // Цена облигации
	maturity: string;         // Дата погашения облигации
	cupon: number;            // Купон
	cupon_percent: number;    // Процент купона
	is_published: boolean;    // Флаг публикации облигации
	slug: string;
}