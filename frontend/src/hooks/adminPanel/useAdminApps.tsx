import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AdminApp {
	id: number;
	name: string;
	label: string;
	verbose_name: string;
}

const apiURL = import.meta.env.VITE_API_URL;

export const useAdminApps = () => {
	return useQuery<AdminApp[], Error>({
		queryKey: ['adminApps'],
		queryFn: async () => {
			const response = await axios.get<AdminApp[]>(`${apiURL}/api/admin/apps/`, { withCredentials: true });
			return response.data;
		},
		retry: 2,
		staleTime: 5 * 60 * 1000,
	});
};