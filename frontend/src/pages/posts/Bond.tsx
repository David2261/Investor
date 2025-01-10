import { Helmet } from 'react-helmet-async';
import { useState, useContext, Key, useMemo } from "react";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// Hooks
import useMediaQuery from "../../hooks/useMediaQuery.ts";
// API
import { useArticles } from "../../api/useArticles.tsx";
// Components
import DataTab from "../../components/Bond/DataTab";
import Article from "../../components/Bond/Article";
import tgSuccess from "../../assets/pages/success.webp";
// Entities
import AuthContext from '../../entities/context/AuthContext.tsx';
// Assets
import '/src/styles/Bonds.css';

// Months for the dividend calendar
const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре'];

// Bond data types
type Bond = {
	id: Key;
	title: string;
	description: string;
	category: string;
	price: number;
	maturity: string;
	cupon: number;
	cupon_percent: number;
	is_published: boolean;
	slug: string;
	[key: string]: any;
};

interface NewsAPIType {
	id: Key;
	category: {
		name: string;
		slug: string;
	};
	title: string;
	img: string | undefined;
	slug: string;
	time_create: string;
	reading_time_minutes: number;
	summary: string;
}

type BondsAPIResponse = Bond[];

const apiURL = import.meta.env.VITE_API_URL;

const Bonds = () => {
	const { authTokens } = useContext(AuthContext);
	const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
	const { data: news, error: errorNews } = useArticles(1, { sortBy: 'popularity', order: 'desc' }, null);
	const [selectedCategory, setSelectedCategory] = useState('all');

	const { data, error } = useQuery<BondsAPIResponse, Error>({
		queryKey: ['bonds'],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/bonds/bond/all`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
		enabled: !!authTokens
	});

	const { data: dataOld, error: errorOld } = useQuery<BondsAPIResponse, Error>({
		queryKey: ['bondsOld'],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/bonds/bond/all/old`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		enabled: !!authTokens
	});

	if (error) return <div>Error: {error.message}</div>;
	if (errorOld) return <div>Error: {errorOld.message}</div>;

	// Current year and next year for dynamic content
	const currentYear = new Date().getFullYear();
	const nextYear = currentYear + 1;

	// Prepare filtered data based on selected category
	const filteredData = useMemo(() => {
		if (selectedCategory === 'old') {
			return dataOld || [];
		}
		if (selectedCategory === 'all') {
			return data || [];
		}
		return data?.filter(item => item.category === selectedCategory) || [];
	}, [selectedCategory, data, dataOld]);

	const dataPostsToDisplay = news?.slice(0, 5) || [];

	return (
		<div className="bonds-body">
			<Helmet>
				<title>Облигации{selectedCategory !== 'all' ? ` | ${selectedCategory}` : ''}</title>
				<meta name='description' content='Bonds page' />
			</Helmet>

			{/* Header */}
			<h1 className="bonds-title">ОФЗ, Муниципальные и Корпоративные Облигации</h1>
			<p className="bonds-under-title">Сервис по облигациям на Московской и Санкт-Петербургской бирже</p>

			{/* News */}
			<div className="sm:flex bonds-news-body">
				{isAboveMediumScreens ?
					<div className="bonds-news-content-block">
						<h1 className="bonds-news-content-block-header">Последние новости по облигациям</h1>
						<Article data={dataPostsToDisplay} />
					</div>
					:
					<div className="flex flex-col">
						<h1 className="text-2xl justify-center">Последние новости по облигациям</h1>
						<Article data={dataPostsToDisplay} />
					</div>
				}

				{isAboveMediumScreens && (
					<div className="bonds-news-add-block">
						<div className="bonds-news-add-header">
							<h1>Телеграм по новостям</h1>
							<img src={tgSuccess} alt="placeholder+image" />
						</div>
						<p className="bonds-news-add-under-text">@investorhome - официальный канал по облигациям.</p>
					</div>
				)}
			</div>

			{/* Block content bonds */}
			<div className={isAboveMediumScreens ? "bonds-content-body" : ""}>
				<h1 className="bonds-content-title">Облигации: календарь на {currentYear}-{nextYear}</h1>
				<p className="bonds-content-under-title">
					Дивидендный календарь в {currentYear}-{nextYear} годах. Ближайшие купоны на одну облигацию в {months[new Date().getMonth()]} и последние (прошедшие) выплаченные купоны.
				</p>

				{/* Category selection */}
				<div className="bonds-content-categories-block">
					<div className="bcc-category" role="group">
						<button
							className="bcc-category-btn"
							onClick={() => setSelectedCategory('all')}
						>
							Все
						</button>
						<button
							className="bcc-category-btn"
							onClick={() => setSelectedCategory('federal loan bonds')}
						>
							ОФЗ
						</button>
						<button
							className="bcc-category-btn"
							onClick={() => setSelectedCategory('municipal bonds')}
						>
							Муниципальные
						</button>
						<button
							className="bcc-category-btn"
							onClick={() => setSelectedCategory('Corporate bonds')}
						>
							Корпоративные
						</button>
					</div>
					<button
						className="bonds-content-categories-old-btn"
						onClick={() => setSelectedCategory('old')}
					>
						прошедшие купоны
					</button>
				</div>

				{/* Table content */}
				<div className={isAboveMediumScreens ? "bonds-content-table" : "overflow-x-auto"}>
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
					<div className="tbl-content">
						<table cellPadding="0" cellSpacing="0">
							<tbody>
								{/* Ensure filteredData exists before rendering */}
								{filteredData?.length > 0 ? (
									<DataTab data={{ results: filteredData }} />
								) : (
									<tr><td colSpan={6}>Нет данных</td></tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Bonds;
