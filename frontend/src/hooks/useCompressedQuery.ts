import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import LZString from 'lz-string';

interface UseCompressedQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

type FetchDataFunction<T> = () => Promise<T>;

type UseCompressedQueryOptions<T> = Omit<UseQueryOptions<T, Error, T, readonly unknown[]>, 'queryKey'>;

const useCompressedQuery = <T>(
  queryKey: string | string[],
  fetchData: FetchDataFunction<T>,
  options: UseCompressedQueryOptions<T> = {}
): UseCompressedQueryResult<T> => {
  const cacheKey = Array.isArray(queryKey) ? queryKey.join('_') : queryKey;
  const staleTime = options.staleTime ?? 1000 * 60 * 10;

  const queryResult = useQuery<T, Error>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      // Проверяем кэш и время его создания
      const cachedCompressed = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(`${cacheKey}_timestamp`);

      // Проверяем, что cachedTime существует и является числом
      if (cachedCompressed && cachedTime) {
        const parsedTime = parseInt(cachedTime, 10);
        if (!isNaN(parsedTime) && typeof staleTime === 'number' && Date.now() - parsedTime < staleTime) {
          const decompressed = LZString.decompressFromUTF16(cachedCompressed);
          if (decompressed) {
            try {
              return JSON.parse(decompressed) as T;
            } catch (e) {
              console.warn('Failed to parse cached data, fetching new data', e);
            }
          }
        }
      }

      // Загружаем данные с сервера
      const result = await fetchData();
      
      // Сжимаем и сохраняем в localStorage
      try {
        const compressed = LZString.compressToUTF16(JSON.stringify(result));
        localStorage.setItem(cacheKey, compressed);
        localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
      } catch (e) {
        console.warn('Failed to compress or save data to localStorage', e);
      }
      
      return result;
    },
    ...options,
  });

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading,
    error: queryResult.error,
  };
};

export default useCompressedQuery;