import axios from "axios";
import { Key, Fragment, FunctionComponent, useState } from "react";


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

function CategoryName(id: number) {
	let category_list:any = axios.get('http://127.0.0.1:8000/api/articles/category/all/');
	// Problem: Uncaught TypeError: Cannot read properties of undefined (reading 'map')
	return category_list.data.map((object: any) => {
		object.id.map((element: { name: string; }) => element.name)
	})
}

const DataTab: FunctionComponent<DataTabType> = (props: DataTabType) => {	

	return (props.data.map((value: PropsType, index) => 
	<Fragment key={index}>
		<tr>
			<td>{(CategoryName(value.category))} {value.title}</td>
			<td>{(CategoryName(value.category))}</td>
			<td>{value.price}</td>
			<td>{value.cupon}</td>
			<td>{value.cupon_percent}</td>
		</tr>
	</Fragment>
	))
};

export default DataTab;