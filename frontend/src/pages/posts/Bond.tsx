import { Component, Key } from "react";
import axios from 'axios';
import '/src/styles/Bonds.css';
import DataTab from "../../components/Bond/DataTab";
import Article from "../../components/Bond/Article";
//Example data
import DATA_ARTICLES from "../../alpha_test_data/bond_article_data.json";
// import BOND_DATA from "../../alpha_test_data/bond_data.json";

const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];

interface BondsAPIType {
	data: {
		id: Key,
		title: number,
		category: string,
		price: number,
		cupon: number,
		cupon_percent: number
	}[],
}

interface State {
	data: [];
	loaded: boolean;
	placeholder: string;
}

class Bonds extends Component<{}, State> {
	constructor(props: BondsAPIType) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		}
	}
	
	async componentDidMount() {
		await axios.get("http://127.0.0.1:8000/api/bonds/bond/all/")
		.then(response => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
			return (response.data as any);
		})
		.then(data => {
			this.setState(() => {
				return {
					data,
					loaded: true
				};
			});
		});
	}

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
						<Article data={DATA_ARTICLES} />
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
									<th>Лот</th>
									<th>Купон</th>
									<th>Купон в %</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					<div className="tbl-content">
						<table cellPadding="0" cellSpacing="0" >
							<tbody>
								<DataTab data={this.state.data} />
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


