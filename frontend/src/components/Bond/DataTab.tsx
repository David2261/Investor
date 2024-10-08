import { Key, Fragment, FunctionComponent, useEffect, useState } from "react";
import axios from 'axios';

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

type PropsType = {
	id: Key,
	title: number,
	category: number,
	price: number,
	cupon: number,
	cupon_percent: number
}

interface Category {
	id: number;
	name: string;
}

const CategoryName: FunctionComponent<{ id: number }> = ({ id }) => {
	const [category, setCategory] = useState<Category | null>(null);

	useEffect(() => {
		const fetchCategory = async () => {
			const response = await axios.get('http://127.0.0.1:8000/api/articles/category/all/');
			const category = response.data.find((object: Category) => object.id === id);
			setCategory(category || null);
		};

		fetchCategory();
	}, [id]);

	return category ? <div>{category.name}</div> : <div>Loading...</div>;
};

const DataTab: FunctionComponent<DataTabType> = ({ data }) => {  
	return (
		data.results.map((value, index) => (
			<Fragment key={index}>
			<tr>
				<td>{value.title}</td>
				<td><CategoryName id={value.category} /></td>
				<td>{value.price}</td>
				<td>{value.cupon}</td>
				<td>{value.cupon_percent}</td>
			</tr>
			</Fragment>
		))
	);
};

export default DataTab;
