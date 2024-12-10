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

export const useAdminPages = (endpoint: string) => {
	const url = `${apiURL}/api/admin/apps/main/${endpoint}/all/`;
	const { authTokens } = useContext(AuthContext);

	return useQuery<ArticlesResponse, Error>({
		queryKey: ['articles', url],
		queryFn: async () => {
			const response = await axios.get<ArticlesResponse>(url, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		enabled: !!endpoint && !!authTokens
	});
};