import { useContext } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
// Entities
import AuthContext from '../../entities/context/AuthContext.tsx';

interface ArticleNewsAPI {
	author: string | null;
	readTime: string | null;
	title: string;
	description: string;
	category: {
		name: string;
		slug: string;
	};
	img: string;
	time_create: string;
	slug: string;
	reading_time_minutes: number;
}
const apiURL = import.meta.env.VITE_API_URL;

const ArticleNews = () => {
	const { category, slug } = useParams();
	const { authTokens } = useContext(AuthContext);
	const { data, error, isLoading } = useQuery<ArticleNewsAPI>({
		queryKey: ['article', category, slug],
		queryFn: async () => {
			const response = await axios.get(`${apiURL}/api/articles/articles/${category}/${slug}`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		enabled: !!category && !!slug && !!authTokens,

	});

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <div>Статья не найдена</div>;
	}

	return (
		<div className="max-w-screen-md mx-auto font-mono p-4">
			<Helmet>
			<title>{data.title}</title>
			<meta name='description' content={`${data.title} | ${data.category.name}`} />
			</Helmet>
			<p className="text-center uppercase text-green-500 text-lg pt-10">{data.category.name}</p>
			<h1 className="text-center text-2xl font-bold uppercase mb-4 text-gray-800">{data.title}</h1>
			<div className="flex flex-row justify-center">
				<div className="flex-col px-4">
					{/* <p className="text-lg text-slate-500">Дата создания: </p> */}
					{/* Uncomment if you want to show author and read time */}
					{/* <p className="text-lg">{data.author ? data.author : "Булат Насыров"}</p> */}
					<p className="text-center text-lg text-slate-500">{new Date(data.time_create).toLocaleDateString()} · {data.reading_time_minutes} min read</p>
				</div>
			</div>
			<div className='flex justify-center mb-4 relative'>
				<img className='object-cover w-auto h-1/3 rounded-md' src={`${apiURL}/${data.img}`} alt={data.title} />
			</div>
			<div className="flex px-8 text-gray-700 leading-relaxed">
				<p className="px-2 md:px-[11rem] text-justify mb-4">{data.description}</p>
			</div>
		</div>
	);
};

export default ArticleNews;