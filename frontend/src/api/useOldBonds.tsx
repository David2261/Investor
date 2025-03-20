import { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Entities
import AuthContext from "../entities/context/AuthContext.tsx";

const useOldBonds = () => {
	const apiURL = import.meta.env.VITE_API_URL;
	const { authTokens } = useContext(AuthContext);

	const fetchOldBonds = async () => {
		const response = await axios.get(`${apiURL}/api/bonds/bond/all/old`, {
			headers: {
				Authorization: `Bearer ${authTokens}`,
			},
		});
		return response.data;
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ["oldBonds"],
		queryFn: async () => fetchOldBonds,
		enabled: !!authTokens,
	});

	return { data, error, isLoading };
};

export default useOldBonds;
  