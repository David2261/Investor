import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// Entities
import AuthContext from '../../entities/context/AuthContext.tsx';

interface AdminModelsResponse {
	[key: string]: string[];
}
  
interface AdminModel {
	id: number;
	name: string;
}

const apiURL = import.meta.env.VITE_API_URL;

export const useAdminModels = () => {
	const { authTokens } = useContext(AuthContext) ?? { authTokens: null };

	return useQuery<AdminModelsResponse, Error>({
		queryKey: ['adminModels'],
		queryFn: async () => {
			const response = await axios.get<AdminModelsResponse>(`${apiURL}/api/admin/apps/models/`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		enabled: !!authTokens
	});
};