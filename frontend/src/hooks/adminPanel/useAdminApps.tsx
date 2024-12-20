import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// Entities
import AuthContext from '../../entities/context/AuthContext.tsx';

interface AdminApp {
	name: string;
	label: string;
	verbose_name: string;
}

const apiURL = import.meta.env.VITE_API_URL;

export const useAdminApps = () => {
	const { authTokens } = useContext(AuthContext);

	return useQuery<AdminApp[], Error>({
		queryKey: ['adminApps'],
		queryFn: async () => {
			const response = await axios.get<AdminApp[]>(`${apiURL}/api/admin/apps/`, {
				headers: {
					Authorization: `Bearer ${authTokens?.access}`
				}
			});
			return response.data;
		},
		enabled: !!authTokens
	});
};