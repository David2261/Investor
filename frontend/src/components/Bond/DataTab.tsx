import axios from "axios";
import { Key, Fragment, FunctionComponent, useState } from "react";


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

function CategoryName(category: string) {

}

const DataTab: FunctionComponent<DataTabType> = (props: DataTabType) => {
	let category_list = axios.get('http://127.0.0.1:8000/api/articles/category/all/');

	return (props.data.map((value: PropsType, index) => 
	<Fragment key={index}>
		<tr>
			<td>{} {value.title}</td>
			<td>{value.category}</td>
			<td>{value.price}</td>
			<td>{value.cupon}</td>
			<td>{value.cupon_percent}</td>
		</tr>
	</Fragment>
	))
};

export default DataTab;