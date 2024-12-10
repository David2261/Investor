import { Key, FunctionComponent } from "react";
// Widgets
import TranslateBondType from "../../widgets/TranslateBondType.tsx";

interface BondData {
    id: Key;
    title: string;
    category: string;
    price: number;
    cupon: number;
    cupon_percent: number;
    maturity: string;
}

interface DataTabType {
    data: {
        results: BondData[];
    };
}

const DataTab: FunctionComponent<DataTabType> = ({ data }) => {
    const results = data.results || [];

    return (
        <table>
            <tbody>
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
            </tbody>
        </table>
    );
};

export default DataTab;