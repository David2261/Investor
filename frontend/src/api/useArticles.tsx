import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// Entities
import AuthContext from "../entities/context/AuthContext.tsx";

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

interface ErrorType {
	message: string;
}

export const useArticles = (
	page: number,
	filter: { sortBy: string; order: string },
	selectedCategory: string | null
	) => {
	const apiURL = import.meta.env.VITE_API_URL;
	const { authTokens } = useContext(AuthContext);
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
			params.append("ordering", filter.sortBy);
			params.append("order", filter.order);
			if (page > 1) params.append("page", page.toString());
			if (selectedCategory) params.append("category", selectedCategory);

			const url = `${apiURL}/api/articles/articles/all/?${params.toString()}`;
			const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${authTokens?.access}`,
			},
			});
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
	}, [authTokens, page, selectedCategory, filter]);

	return {
		data,
		loading,
		error,
		totalItems,
		nextPage,
		previousPage,
	};
};
