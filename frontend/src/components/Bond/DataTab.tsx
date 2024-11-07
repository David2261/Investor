import { Key, FunctionComponent } from "react";

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

    const translateBondType = (bondType: string) => {
        const translations: Record<string, string> = {
            'municipal bonds': 'Муниципальные облигации',
            'corporate bonds': 'Корпоративные облигации',
            'federal loan bonds': 'Облигации федерального займа',
        };
        return translations[bondType.toLowerCase()] || bondType;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Облигация</th>
                    <th>Реестр</th>
                    <th>Лот</th>
                    <th>Купон</th>
                    <th>Купон в %</th>
                    <th>Дата погашения</th>
                </tr>
            </thead>
            <tbody>
                {results.length > 0 ? (
                    results.map((value) => (
                        <tr key={value.id}>
                            <td data-label="Облигация">{value.title}</td>
                            <td data-label="Реестр">{translateBondType(value.category)}</td>
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