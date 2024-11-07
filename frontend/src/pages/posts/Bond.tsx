import { Key, useState, useMemo } from "react";
import axios from 'axios';
import '/src/styles/Bonds.css';
// Hooks
import { useQuery } from '@tanstack/react-query';
// Hooks
import useMediaQuery from "../../hooks/useMediaQuery.ts";
// Components
import DataTab from "../../components/Bond/DataTab";
import Article from "../../components/Bond/Article";
import tgSuccess from "../../assets/pages/success.webp";

const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре'];

interface Bond {
    id: Key;
    title: string;
    category: string;
    price: number;
    cupon: number;
    cupon_percent: number;
    maturity: string;
}

interface BondsAPIType {
    results: Bond[];
}

const Bonds = () => {
	const apiURL = import.meta.env.VITE_API_URL;
	const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
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
			return response.data;
		}
	});

	if (error) return <div>Error: {error.message}</div>;
	if (errorOld) return <div>Error: {errorOld.message}</div>;
	if (errorPosts) return <div>Error: {errorPosts.message}</div>;

	if (isLoading) return <div>Loading...</div>;

	// Prepare filtered data
	const filteredData = useMemo(() => {
        if (selectedCategory === 'old') {
            return dataOld?.results || [];
        }
        if (selectedCategory === 'all') {
            return data?.results || [];
        }
        return data?.results.filter(item => item.category === selectedCategory) || [];
    }, [selectedCategory, data, dataOld]);

	// @ts-ignore
    const dataPostsToDisplay = dataPosts?.slice(0, 5) || [];

	return (
		<div className="bonds-body">
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
				{isAboveMediumScreens ?
					<div className="bonds-news-add-block">
						<div className="bonds-news-add-header">
							<h1>Телеграм по новостям</h1>
							<img src={tgSuccess} alt="placeholder+image" />
						</div>
						<p className="bonds-news-add-under-text">@investorhome - официальный канал по облигациям.</p>
					</div>
				: null}
			</div>
			{/* Block content bonds */}
			{isAboveMediumScreens ?
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
			:
			<div className="bonds-content-table">
				<h1 className="bonds-content-title">Облигации: календарь на {new Date().getFullYear()}-{new Date().getFullYear() + 1}</h1>
				<p className="bonds-content-under-title">
					Дивидендный календарь в {new Date().getFullYear()}-{new Date().getFullYear() + 1} годах. Ближайшие купоны на одну облигацию в {months[new Date().getMonth()]} и последние (прошедшие) выплаченные купоны.
				</p>
				<div className="flex md:flex-row justify-between items-center mt-4">
                    <div className="flex flex-wrap gap-4 space-x-2 mb-4">
                        <button className="text-[#a9a9a9] bg-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedCategory('all')}>Все</button>
                        <button className="text-[#a9a9a9] bg-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedCategory('federal loan bonds')}>ОФЗ</button>
                        <button className="text-[#a9a9a9] bg-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedCategory('municipal bonds')}>Муниципальные</button>
                        <button className="text-[#a9a9a9] bg-white font-semibold py-2 px-4 rounded" onClick={() => setSelectedCategory('Corporate bonds')}>Корпоративные</button>
                    	<button className="text-[#a9a9a9] bg-white font-semibold hover:text-black" onClick={() => setSelectedCategory('old')}>прошедшие купоны</button>
                    </div>
                </div>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 table-auto">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Облигация</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Реестр</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Лот</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Купон</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Купон в %</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Дата погашения</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							<DataTab data={{ results: filteredData }} />
						</tbody>
					</table>
				</div>
			</div>}
		</div>
	);
}

export default Bonds;
