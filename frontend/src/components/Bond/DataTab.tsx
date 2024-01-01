import { Key, Fragment, FunctionComponent } from "react";


interface DataTabPropsType {
	data: {
        id: Key,
		number: number,
        category: string,
        price: number,
	}[],
}

type DataType = {
	args: {
		id: Key,
		number: number,
        category: string,
        price: number,
	}
}

const DataTab: FunctionComponent<DataTabPropsType> = (props: DataTabPropsType) => {
    return (props.data.map((value: DataType["args"]) => 
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