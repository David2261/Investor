import { Key, Fragment, FunctionComponent } from "react";


interface DataTabType {
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

const DataTab: FunctionComponent<DataTabType> = (props: DataTabType) => {
	return (props.data.map((value: PropsType, index) => 
	<Fragment key={index}>
		<tr>
			<td>{value.category} {value.title}</td>
			<td>{value.category}</td>
			<td>{value.price}</td>
			<td>{value.cupon}</td>
			<td>{value.cupon_percent}</td>
		</tr>
	</Fragment>
	))
};

export default DataTab;