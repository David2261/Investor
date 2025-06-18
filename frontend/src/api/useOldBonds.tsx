import useCompressedQuery from '@/hooks/useCompressedQuery';
import axios from "axios";
import { Bond } from "../types/Bond"


type BondsAPIResponse = Bond[];

const useOldBonds = () => {
	const apiURL = import.meta.env.VITE_API_URL;

	const queryKey = ['oldBonds'];

	const fetchOldBonds = async () => {
		const response = await axios.get(`${apiURL}/api/bonds/bond/all/old`, { withCredentials: true });
		return response.data;
	};

	const { data, isLoading, error } = useCompressedQuery<BondsAPIResponse>(
		queryKey,
		fetchOldBonds,
		{
		staleTime: 1000 * 60 * 10
		}
	);

	return { data, error, isLoading };
};

export default useOldBonds;