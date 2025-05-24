import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AdminModelsResponse {
	[key: string]: string[];
}

const apiURL = import.meta.env.VITE_API_URL;

export const useAdminModels = () => {
	return useQuery<AdminModelsResponse, Error>({
		queryKey: ['adminModels'],
		queryFn: async () => {
			const response = await axios.get<AdminModelsResponse>(`${apiURL}/api/admin/apps/models/`, { withCredentials: true });
			return response.data;
		}
	});
};