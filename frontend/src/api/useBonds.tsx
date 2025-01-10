import { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// Entities
import AuthContext from "../entities/context/AuthContext.tsx";

const apiURL = import.meta.env.VITE_API_URL;

const useBonds = () => {
    const { authTokens } = useContext(AuthContext);

    const fetchBonds = async () => {
        const response = await axios.get(`${apiURL}/api/bonds/bond/all`, {
        headers: {
            Authorization: `Bearer ${authTokens}`,
        },
        });
        return response.data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["bonds"],
        queryFn: async () => fetchBonds,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
        enabled: !!authTokens
    },
);

    return { data, error, isLoading };
};

export default useBonds;
