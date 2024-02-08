import axios, { AxiosResponse } from "axios";
import { Key, Fragment, FunctionComponent } from "react";


interface DataTabType {
	category: any;
	data: {
		id: Key,
		title: number,
		category: string,
		price: number,
		cupon: number,
		cupon_percent: number
	}[],
}

type PropsType = {
	id: Key,
	title: number,
	category: string,
	price: number,
	cupon: number,
	cupon_percent: number
}

function Category(id: { category: string; }) {
	return axios.get('http://127.0.0.1:8000/api/articles/category/' + id.category)
}

const DataTab: FunctionComponent<DataTabType> = (props: DataTabType) => {
	category_name = Category(props.data.id);
	return (props.data.map((value: PropsType, index) => 
	<Fragment key={index}>
		<tr>
			<td>{category_name} {value.title}</td>
			<td>{value.category}</td>
			<td>{value.price}</td>
			<td>{value.cupon}</td>
			<td>{value.cupon_percent}</td>
		</tr>
	</Fragment>
	))
};

export default DataTab;