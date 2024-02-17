import axios from "axios";
import { Key, Fragment, FunctionComponent, useState, useEffect } from "react";


interface DataTabType {
	category: any;
	data: {
		id: Key,
		title: number,
		category: number,
		price: number,
		cupon: number,
		cupon_percent: number
	}[],
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

const CategoryName: React.FC<{ id: number }> = ({ id }) => {
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

const DataTab: FunctionComponent<DataTabType> = (props: DataTabType) => {	

	return (props.data.map((value: PropsType, index) => 
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
};

export default DataTab;