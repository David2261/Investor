import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Article {
	id: number;
	title: string;
	content: string;
}

interface ArticlesResponse {
	articles: Article[];
}

const apiURL = import.meta.env.VITE_API_URL;

export const useAdminArticles = () => {
	return useQuery<ArticlesResponse, Error>({
		queryKey: ['articles'],
		queryFn: async () => {
			const response = await axios.get<ArticlesResponse>(`${apiURL}/api/admin/apps/main/articles/`, { withCredentials: true });
			return response.data;
		}
	});
};