import { useState, useEffect } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface ErrorType {
  message: string;
}

export const useAllCategories = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<Category[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [dataCount, setDataCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/articles/category/all/`);
        setData(response.data.results);
        setDataCount(response.data.count);
      } catch (err) {
        setError(err as any);
      }
    };
    fetchData();
  }, [apiURL]);

  return { data, dataCount, error };
};
