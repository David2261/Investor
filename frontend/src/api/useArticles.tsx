import useCompressedQuery from '@/hooks/useCompressedQuery';
import axios from 'axios';
import { BlogAPIType } from '../types/Articles';

interface PaginatedArticlesResponse {
  results: BlogAPIType[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const useArticles = (
  page: number,
  filter: { sortBy: string; order: string },
  selectedCategory: string | null
) => {
  const apiURL = import.meta.env.VITE_API_URL;

  const queryKey = [
    'articles',
    page.toString(),
    selectedCategory ?? 'none',
    filter.sortBy,
    filter.order,
  ];

  // Функция для загрузки данных
  const fetchArticles = async (): Promise<PaginatedArticlesResponse> => {
    const params = new URLSearchParams();
    const ordering = filter.order === 'desc' ? `-${filter.sortBy}` : filter.sortBy;
    params.append('ordering', ordering);
    if (page > 1) params.append('page', page.toString());
    if (selectedCategory) params.append('category', selectedCategory);

    const url = `${apiURL}/api/articles/articles/all/?${params.toString()}`;
    const response = await axios.get<PaginatedArticlesResponse>(url, { withCredentials: true });
    return response.data;
  };

  // Используем useCompressedQuery
  const { data, isLoading, error } = useCompressedQuery<PaginatedArticlesResponse>(
    queryKey,
    fetchArticles,
    { staleTime: 1000 * 60 * 10 } // 10 минут
  );

  return {
    data: data?.results ?? [],
    loading: isLoading,
    error: error ? (error instanceof Error ? error.message : 'An error occurred') : null,
    totalItems: data?.count ?? 0,
    nextPage: data?.next ?? null,
    previousPage: data?.previous ?? null,
  };
};