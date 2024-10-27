import { Key, FunctionComponent } from "react";

interface DataTabType {
	data: {
		results: {
			id: Key,
			title: number,
			category: number,
			price: number,
			cupon: number,
			cupon_percent: number
		}[],
	},
}

const DataTab: FunctionComponent<DataTabType> = ({ data }) => {
	const translateBondType = (bondType) => {
		const translations = {
			'municipal bonds': 'Муниципальные облигации',
			'corporate bonds': 'Корпоративные облигации',
			'federal loan bonds': 'Облигации федерального займа',
		};
		return translations[bondType.toLowerCase()] || bondType;
	};

	return (
		data.results.map((value, index) => (
			<tr key={index}>
				<td>{value.title}</td>
				<td>{translateBondType(value.category)}</td>
				<td>{value.price}</td>
				<td>{value.cupon}</td>
				<td>{value.cupon_percent}</td>
			</tr>
		))
	);
};

export default DataTab;
