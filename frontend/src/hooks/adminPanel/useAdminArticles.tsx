import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// Entities
import AuthContext from '../../entities/context/AuthContext.tsx';

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
	const { authTokens } = useContext(AuthContext);

	return useQuery<ArticlesResponse, Error>({
		queryKey: ['articles'],
		queryFn: async () => {
			const response = await axios.get<ArticlesResponse>(`${apiURL}/api/admin/apps/main/articles/`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		enabled: !!authTokens
	});
};