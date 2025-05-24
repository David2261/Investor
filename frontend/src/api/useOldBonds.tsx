import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useOldBonds = () => {
	const apiURL = import.meta.env.VITE_API_URL;

	const fetchOldBonds = async () => {
		const response = await axios.get(`${apiURL}/api/bonds/bond/all/old`, { withCredentials: true });
		return response.data;
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ["oldBonds"],
		queryFn: async () => fetchOldBonds
	});

	return { data, error, isLoading };
};

export default useOldBonds;
  