import { useQuery } from "@tanstack/react-query";
import axios from "axios";



const useBonds = () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const fetchBonds = async () => {
        const response = await axios.get(`${apiURL}/api/bonds/bond/all`, { withCredentials: true });
        return response.data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["bonds"],
        queryFn: async () => fetchBonds,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
    },
);

    return { data, error, isLoading };
};

export default useBonds;
