import axios from 'axios';
import { Bond } from "../types/Bond"
import useCompressedQuery from '../hooks/useCompressedQuery';


type BondsAPIResponse = Bond[];

export const useBonds = (selectedCategory: string = 'all') => {
  const apiURL = import.meta.env.VITE_API_URL;

  // Формируем queryKey, обеспечивая, что все элементы — строки
  const queryKey = ['bonds', selectedCategory];

  // Функция для загрузки данных
  const fetchBonds = async (): Promise<BondsAPIResponse> => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') {
      params.append('category', selectedCategory);
    }

    const url = `${apiURL}/api/bonds/bond/all${selectedCategory !== 'all' ? `?${params.toString()}` : ''}`;
    const response = await axios.get<BondsAPIResponse>(url, { withCredentials: true });
    return response.data;
  };

  // Используем useCompressedQuery
  const { data, isLoading, error } = useCompressedQuery<BondsAPIResponse>(
    queryKey,
    fetchBonds,
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data: data ?? [],
    isLoading,
    error: error ? { message: error instanceof Error ? error.message : 'An error occurred' } : null,
  };
};

export const useBondsOld = () => {
  const apiURL = import.meta.env.VITE_API_URL;

  // Формируем queryKey
  const queryKey = ['bondsOld'];

  // Функция для загрузки старых облигаций
  const fetchBondsOld = async (): Promise<BondsAPIResponse> => {
    const response = await axios.get<BondsAPIResponse>(`${apiURL}/api/bonds/bond/all/old`, { withCredentials: true });
    return response.data;
  };

  // Используем useCompressedQuery
  const { data, isLoading, error } = useCompressedQuery<BondsAPIResponse>(
    queryKey,
    fetchBondsOld,
    {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data: data ?? [],
    isLoading,
    error: error ? { message: error instanceof Error ? error.message : 'An error occurred' } : null,
  };
};