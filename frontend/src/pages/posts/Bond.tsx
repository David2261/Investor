import { Key, useState } from "react";
import axios from 'axios';
import '/src/styles/Bonds.css';
// Hooks
import { useQuery } from '@tanstack/react-query';
// Components
import DataTab from "../../components/Bond/DataTab";
import Article from "../../components/Bond/Article";
import tgSuccess from "../../assets/pages/success.webp";

const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре'];

interface BondsAPIType {
	results: {
		id: Key,
		title: string,
		category: string,
		price: number,
		cupon: number,
		cupon_percent: number,
		maturity: string
	}[];
}

const Bonds = () => {
	const apiURL = import.meta.env.VITE_API_URL;
	const [selectedCategory, setSelectedCategory] = useState('all');

	const { data, error, isLoading } = useQuery<BondsAPIType, Error>({
		queryKey: ['bonds'],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/bonds/bond/all`);
			return response.data;
		}
	});

	const { data: dataOld, error: errorOld } = useQuery<BondsAPIType, Error>({
		queryKey: ['bondsOld'],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/bonds/bond/all/old`);
			return response.data;
		}
	});

	const { data: dataPosts, error: errorPosts } = useQuery<BondsAPIType, Error>({
		queryKey: ['articles'],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/articles/articles/home/all`);
			return response.data.results;
		}
	});

	if (error) return <div>Error: {error.message}</div>;
	if (errorOld) return <div>Error: {errorOld.message}</div>;
	if (errorPosts) return <div>Error: {errorPosts.message}</div>;

	if (isLoading) return <div>Loading...</div>;

	// Prepare filtered data
	const filteredData = selectedCategory === 'old'
		? dataOld || []
		: selectedCategory === 'all'
			? data || []
			: data.filter(item => item.category === selectedCategory) || [];

	const data_posts = dataPosts?.length > 0 ? dataPosts.slice(0, 5) : [];

	return (
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
						<button className="bcc-category-btn" onClick={() => setSelectedCategory('all')}>Все</button>
						<button className="bcc-category-btn" onClick={() => setSelectedCategory('federal loan bonds')}>ОФЗ</button>
						<button className="bcc-category-btn" onClick={() => setSelectedCategory('municipal bonds')}>Муниципальные</button>
						<button className="bcc-category-btn" onClick={() => setSelectedCategory('Corporate bonds')}>Корпоративные</button>
					</div>
					<button className="bonds-content-categories-old-btn" onClick={() => setSelectedCategory('old')}>прошедшие купоны</button>
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
									<th>Дата погашения</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
				<div className="tbl-content">
					<table cellPadding="0" cellSpacing="0">
						<tbody>
							<DataTab data={{ results: filteredData }} />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Bonds;
