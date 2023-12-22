import { Component, Fragment, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import '/src/styles/Bonds.css';
import BOND_DATA from "/src/alpha_test_data/bond_data.tsx";
import DATA_ARTICLES from "/src/alpha_test_data/bond_article_data.tsx";

var months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];

const Article = DATA_ARTICLES.map((value: {
    id: Key;
    img: string | undefined;
    text: string;
    category: string;
}) =>
	<Fragment key={value.id}>
		<div className="bonds-news-content-block-article">
            <img src={value.img} alt="" />
            <p>{value.text} | {value.category}</p>
        </div>
	</Fragment>
);

const DataTab = BOND_DATA.map((value: {
    number: number;
    id: Key;
    category: string;
    price: number; 
}) => 
    <Fragment key={value.id}>
        <tr>
            <td>{value.category} {value.number}</td>
            <td>AUSTRALIAN COMPANY </td>
            <td>{value.price}</td>
            <td>-0.36%</td>
        </tr>
    </Fragment>);

class Bonds extends Component {

    render() {
        return (
            <>
            <div className="bonds-body">
                {/* Header */}
                <h1 className="bonds-title">ОФЗ, Муниципальные и Корпоративные Облигации</h1>
                <p className="bonds-under-title">Сервис по облигациям на Московской и Санкт-Петербургской бирже</p>
                {/* News */}
                <div className="bonds-news-body">
                    <div className="bonds-news-content-block">
                        <h1 className="bonds-news-content-block-header">Последние новости по облигациям</h1>
                        { Article }
                    </div>
                    <div className="bonds-news-add-block">
                        <div className="bonds-news-add-header">
                            <h1>Телеграм по новостям</h1>
                            <img src="http://dummyimage.com/50x50/4d494d/686a82.jpeg&text=placeholder+image" alt="placeholder+image" />
                        </div>
                        <p className="bonds-news-add-under-text">@investorhome - официальный канал по облигациям.</p>
                    </div>
                </div>
                {/* Block content bonds */}
                <div className="bonds-content-body">
                    <h1 className="bonds-content-title">Облигации: календарь на {new Date().getFullYear()}-{new Date().getFullYear() + 1}</h1>
                    <p className="bonds-content-under-title">
                    Дивидендный календарь в {new Date().getFullYear()}-{new Date().getFullYear() + 1} годах. Ближайшие купоны на одну облигацию в {months[new Date().getMonth()]} и последние (прошедшие) выплаченные купоны.
                    </p>
                    <div className="bonds-content-categories-block">
                        <div className="bcc-category" role="group">
                            <button className="bcc-category-btn">Все</button>
                            <button className="bcc-category-btn">ОФЗ</button>
                            <button className="bcc-category-btn">Муниципальные</button>
                            <button className="bcc-category-btn">Корпоративные</button>
                        </div>
                        <button className="bonds-content-categories-old-btn">прошедшие купоны</button>
                    </div>
                    <div className="bonds-content-table">
                        <div className="tbl-header">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                    <th>Облигация</th>
                                    <th>Реестр</th>
                                    <th>Купон</th>
                                    <th>Лет до погашения</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className="tbl-content">
                        <table cellPadding="0" cellSpacing="0" >
                            <tbody>
                                {DataTab}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
            </>
        );
    }
}


export default Bonds;
