import { Key, useState, useEffect } from "react";
import axios from 'axios';
import '/src/styles/Bonds.css';
// Hooks
import { useFetch } from '../../hooks/useFetch.ts';
// Components
import DataTab from "../../components/Bond/DataTab";
import Article from "../../components/Bond/Article";
import tgSuccess from "../../assets/pages/success.webp";

const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];

interface BondsAPIType {
	results: {
		id: Key,
		title: number,
		category: number,
		price: number,
		cupon: number,
		cupon_percent: number
	}[],
}

const Bonds = () => {
	const apiURL = import.meta.env.VITE_API_URL;
	const [dataPosts, setData] = useState<any[]>([]);
	const [errorPosts, setError] = useState(null);

	const {data, error} : {
		data: {
			results: BondsAPIType[];
		} | null | undefined;
		error: { message: string };
	} = useFetch<BondsAPIType[]>(`${apiURL}/api/bonds/bond/all/`, {method: 'GET'});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${apiURL}/api/articles/articles/home/all`);
				setData(response.data.results);
			} catch (err) {
				setError(err as any);
			}
		};
		fetchData();
	}, [apiURL]);

	const data_posts = dataPosts.length > 0 ? dataPosts.slice(0, 5) : [];

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <div>Loading...</div>;
	}

	if (errorPosts) {
		return <div>Error: {errorPosts.message}</div>;
	}

	return <>
		<div className="bonds-body">
			{/* Header */}
			<h1 className="bonds-title">ОФЗ, Муниципальные и Корпоративные Облигации</h1>
			<p className="bonds-under-title">Сервис по облигациям на Московской и Санкт-Петербургской бирже</p>
			{/* News */}
			<div className="bonds-news-body">
				<div className="bonds-news-content-block">
					<h1 className="bonds-news-content-block-header">Последние новости по облигациям</h1>
					<Article data={data_posts} />
				</div>
				<div className="bonds-news-add-block">
					<div className="bonds-news-add-header">
						<h1>Телеграм по новостям</h1>
						<img src={tgSuccess} alt="placeholder+image" />
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
							<DataTab data={data} />
						</tbody>
					</table>
				</div>
			</div>
		</div> 
		</>
}


export default Bonds;