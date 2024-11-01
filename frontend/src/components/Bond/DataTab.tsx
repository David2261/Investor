import { Key, FunctionComponent } from "react";

interface BondData {
	id: Key;
	title: string;
	category: string;
	price: number;
	cupon: number;
	cupon_percent: number;
	maturity: string;
}

interface DataTabType {
	data: {
		results: BondData[];
	};
}

const DataTab: FunctionComponent<DataTabType> = ({ data }) => {
	if (data.length === 0) {
		return false;
	}
	const translateBondType = (bondType: string) => {
		const translations = {
			'municipal bonds': 'Муниципальные облигации',
			'corporate bonds': 'Корпоративные облигации',
			'federal loan bonds': 'Облигации федерального займа',
		};
		return translations[bondType.toLowerCase()] || bondType;
	};

	return (
		<>
			{data && data.results && data.results.length > 0 ? (
				data.results.map((value) => (
					<tr key={value.id}>
						<td data-label="Облигация">{value.title}</td>
						<td data-label="Реестр">{translateBondType(value.category)}</td>
						<td data-label="Лот">{value.price}</td>
						<td data-label="Купон">{value.cupon}</td>
						<td data-label="Купон в %">{value.cupon_percent}</td>
						<td data-label="Дата погашения">{value.maturity.split('T')[0]}</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan={5} style={{ textAlign: "center" }}>Нет данных для отображения</td>
				</tr>
			)}
		</>
	);
};

export default DataTab;
