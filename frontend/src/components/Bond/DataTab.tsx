import { Key, Fragment, FunctionComponent } from "react";


interface DataTabType {
	data: {
		id: Key,
		number: number,
		category: string,
		price: number,
	}[],
}

type PropsType = {
	id: Key,
	number: number,
	category: string,
	price: number,
}

const DataTab: FunctionComponent<DataTabType> = (props: DataTabType) => {
	return (props.data.map((value: PropsType) => 
	<Fragment key={value.id}>
		<tr>
			<td>{value.category} {value.number}</td>
			<td>AUSTRALIAN COMPANY </td>
			<td>{value.price}</td>
			<td>-0.36%</td>
		</tr>
	</Fragment>
	))
};

export default DataTab;