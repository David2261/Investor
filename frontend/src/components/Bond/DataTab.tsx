import { FunctionComponent } from "react";
// Widgets
import TranslateBondType from "@/widgets/TranslateBondType.tsx";
// Types
import { Bond } from '@/types/Bond';


interface DataTabType {
    data: {
        results: Bond[];
    };
}

const DataTab: FunctionComponent<DataTabType> = ({ data }) => {
    const results = data.results || [];

    return (<>
        {results.length > 0 ? (
            results.map((value) => (
                <tr key={value.id}>
                    <td data-label="Облигация">{value.title}</td>
                    <td data-label="Реестр">{TranslateBondType(value.category)}</td>
                    <td data-label="Лот">{value.price}</td>
                    <td data-label="Купон">{value.cupon}</td>
                    <td data-label="Купон в %">{value.cupon_percent}</td>
                    <td data-label="Дата погашения">{value.maturity.split('T')[0]}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>Нет данных для отображения</td>
            </tr>
        )}
    </>);
};

export default DataTab;