import { useState, useEffect } from 'react';
import axios from 'axios';

interface BlogAPIType {
	id: number;
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


export const useArticles = (
	page: number,
	filter: { sortBy: string; order: string },
	selectedCategory: string | null
	) => {
	const apiURL = import.meta.env.VITE_API_URL;
	const [data, setData] = useState<BlogAPIType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [totalItems, setTotalItems] = useState(0);
	const [nextPage, setNextPage] = useState<string | null>(null);
	const [previousPage, setPreviousPage] = useState<string | null>(null);

	useEffect(() => {
	const fetchArticles = async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams();
			const ordering = filter.order === 'desc' ? `-${filter.sortBy}` : filter.sortBy;
			params.append("ordering", ordering);
			if (page > 1) params.append("page", page.toString());
			if (selectedCategory) params.append("category", selectedCategory);

			const url = `${apiURL}/api/articles/articles/all/?${params.toString()}`;
			const response = await axios.get(url, { withCredentials: true });

			setData(response.data.results);
			setTotalItems(response.data.count);
			setNextPage(response.data.next);
			setPreviousPage(response.data.previous);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	fetchArticles();
}, [page, selectedCategory, filter.sortBy, filter.order]);

	return {
		data,
		loading,
		error,
		totalItems,
		nextPage,
		previousPage,
	};
};
