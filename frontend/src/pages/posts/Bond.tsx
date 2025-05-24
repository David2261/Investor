import React, { useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useMediaQuery from '@/hooks/useMediaQuery.ts';
import { useArticles } from '@/api/useArticles.tsx';
import '@/styles/Bonds.css';
import tgSuccess from '@/assets/pages/success.webp';

const DataTab = lazy(() => import('@/components/Bond/DataTab'));
const Article = lazy(() => import('@/components/Bond/Article'));
const NotFound = lazy(() => import('@/widgets/handlerError/404'));

const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре'];

interface Bond {
  id: React.Key;
  title: string;
  description: string;
  category: string;
  price: number;
  maturity: string;
  cupon: number;
  cupon_percent: number;
  is_published: boolean;
  slug: string;
  [key: string]: any;
}

interface ErrorType {
  message: string;
}

type BondsAPIResponse = Bond[];

const apiURL = import.meta.env.VITE_API_URL;

const Bonds: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const isMobile = useMediaQuery('(max-width: 640px)'); // Новый брейкпоинт для мобильных
  const { data: news, error: errorNews } = useArticles(1, { sortBy: 'popularity', order: 'desc' }, null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data, error } = useQuery<BondsAPIResponse, ErrorType>({
    queryKey: ['bonds'],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/api/bonds/bond/all`, { withCredentials: true });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { data: dataOld, error: errorOld } = useQuery<BondsAPIResponse, ErrorType>({
    queryKey: ['bondsOld'],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/api/bonds/bond/all/old`, { withCredentials: true });
      return response.data;
    }
  });

  const getErrorMessage = (err: ErrorType | string | null | undefined): string | null => {
    if (!err) return null;
    return typeof err === 'string' ? err : err.message || 'Неизвестная ошибка';
  };

  const errorMessage = getErrorMessage(error) || getErrorMessage(errorNews) || getErrorMessage(errorOld);
  if (errorMessage) {
    return (
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Загрузка...</div>}>
        <NotFound />
      </Suspense>
    );
  }

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  const filteredData = selectedCategory === 'old'
    ? dataOld ?? []
    : selectedCategory === 'all'
    ? data ?? []
    : data?.filter((item) => item.category === selectedCategory) ?? [];

  const dataPostsToDisplay = news?.slice(0, 5) || [];

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Загрузка...</div>}>
      <div className="bonds-body">
        <Helmet>
          <title>Облигации{selectedCategory !== 'all' ? ` | ${selectedCategory}` : ''}</title>
          <meta name="description" content="Сервис по облигациям на Московской и Санкт-Петербургской бирже" />
        </Helmet>

        {/* Header */}
        <h1 className="bonds-title">ОФЗ, Муниципальные и Корпоративные Облигации</h1>
        <p className="bonds-under-title">Сервис по облигациям на Московской и Санкт-Петербургской бирже</p>

        {/* News Section */}
        <div className={isMobile ? 'flex flex-col items-center' : 'sm:flex bonds-news-body'}>
          <div className={isMobile ? 'w-full' : 'bonds-news-content-block'}>
            <h1 className={isMobile ? 'text-2xl text-center mb-4' : 'bonds-news-content-block-header'}>
              Последние новости по облигациям
            </h1>
            <Article data={dataPostsToDisplay} />
          </div>
          {!isMobile && isAboveMediumScreens && (
            <div className="bonds-news-add-block">
              <div className="bonds-news-add-header">
                <h1>Телеграм по новостям</h1>
                <img src={tgSuccess} alt="Телеграм-канал по облигациям" loading="lazy" />
              </div>
              <p className="bonds-news-add-under-text">@investorhome - официальный канал по облигациям.</p>
            </div>
          )}
          {isMobile && (
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold">Телеграм по новостям</h3>
              <p className="text-sm text-gray-600">@investorhome - официальный канал по облигациям.</p>
              <img
                src={tgSuccess}
                alt="Телеграм-канал по облигациям"
                loading="lazy"
                className="mt-4 w-32 mx-auto"
              />
            </div>
          )}
        </div>

        {/* Bonds Content */}
        <div className={isAboveMediumScreens ? 'bonds-content-body' : 'px-4'}>
          <h1 className="bonds-content-title">Облигации: календарь на {currentYear}-{nextYear}</h1>
          <p className="bonds-content-under-title">
            Дивидендный календарь в {currentYear}-{nextYear} годах. Ближайшие купоны на одну облигацию в{' '}
            {months[new Date().getMonth()]} и последние (прошедшие) выплаченные купоны.
          </p>

          {/* Category Selection */}
          <div className="bonds-content-categories-block flex flex-wrap gap-2 justify-center">
            <div className="bcc-category flex gap-2" role="group">
              {[
                { key: 'all', label: 'Все' },
                { key: 'federal loan bonds', label: 'ОФЗ' },
                { key: 'municipal bonds', label: 'Муниципальные' },
                { key: 'Corporate bonds', label: 'Корпоративные' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`bcc-category-btn ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className={`bonds-content-categories-old-btn ${selectedCategory === 'old' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('old')}
            >
              Прошедшие купоны
            </button>
          </div>

          {/* Table Content */}
          <div className={isMobile ? 'overflow-x-auto w-full' : 'bonds-content-table'}>
            <div className="tbl-header">
              <table cellPadding="0" cellSpacing="0" className="w-full">
                <thead>
                  <tr>
                    <th>Облигация</th>
                    <th>Реестр</th>
                    <th>Лот</th>
                    <th>Купон</th>
                    <th>Купон в %</th>
                    <th>Дата погашения</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" className="w-full">
                <tbody>
                  {filteredData.length > 0 ? (
                    <DataTab data={{ results: filteredData as any }} />
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4">
                        Нет данных
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Bonds;