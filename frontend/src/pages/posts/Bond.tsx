import React, { useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
// Widgets
import Loader from '@/widgets/Loader';
// Hooks
import useMediaQuery from '@/hooks/useMediaQuery.ts';
// Api
import { useArticles } from '@/api/useArticles.tsx';
import { useBonds, useBondsOld } from '@/api/useBonds';
import { BlogAPIType } from '@/types/Articles';
// Styles
import styles from '../../styles/Bond.module.css';
import tgSuccess from '@/assets/pages/success.webp';

const DataTab = lazy(() => import('@/components/Bond/DataTab'));
const Article = lazy(() => import('@/components/Bond/Article'));
const NotFound = lazy(() => import('@/widgets/handlerError/404'));

const months = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре'];

interface ErrorType {
  message: string;
}

const Bonds: React.FC = () => {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { data: news, error: errorNews } = useArticles(1, { sortBy: 'popularity', order: 'desc' }, null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data, isLoading, error } = useBonds(selectedCategory);
  const { data: dataOld, isLoading: isLoadingOld, error: errorOld } = useBondsOld();

  const getErrorMessage = (err: ErrorType | Error | string | null | undefined): string | null => {
    if (!err) return null;
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    return err.message || 'Неизвестная ошибка';
  };

  const errorMessage = getErrorMessage(error) || getErrorMessage(errorNews) || getErrorMessage(errorOld);
  if (errorMessage) {
    return (
      <Suspense fallback={<NotFound />}>
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

  // Transform news to ContentItemType[]
  const dataPostsToDisplay = news
    ? news.slice(0, 5).map((item) => ({
        ...item,
        img: item.img ?? null,
      })) as BlogAPIType[]
    : [];

  if (isLoading || isLoadingOld) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-w-full min-h-screen p-4 max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <Helmet>
          <title>Облигации{selectedCategory !== 'all' ? ` | ${selectedCategory}` : ''}</title>
          <meta name="description" content="Сервис по облигациям на Московской и Санкт-Петербургской бирже" />
        </Helmet>

        {/* Header */}
        <h1
          className="flex justify-center font-bold pt-5"
          style={{ fontSize: '2rem' }}>ОФЗ, Муниципальные и Корпоративные Облигации</h1>
        <p className={styles["bonds-under-title"]}>Сервис по облигациям на Московской и Санкт-Петербургской бирже</p>

        {/* News Section */}
        <div className={isMobile ? 'flex flex-col items-center' : `sm:flex ${styles['bonds-news-body']}`}>
          <div className={isMobile ? 'w-full' : styles['bonds-news-content-block']}>
            <h1 className={isMobile ? 'text-2xl text-center mb-4' : styles['bonds-news-content-block-header']}>
              Последние новости по облигациям
            </h1>
            <Article data={dataPostsToDisplay} />
          </div>
          {!isMobile && isAboveMediumScreens && (
            <div className={styles['bonds-news-add-block']}>
              <div className={styles['bonds-news-add-header']}>
                <h1>Телеграм по новостям</h1>
                <img src={tgSuccess} alt="Телеграм-канал по облигациям" loading="lazy" />
              </div>
              <p className={styles['bonds-news-add-under-text']}>@investorhome - официальный канал по облигациям.</p>
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
        <div className={isAboveMediumScreens ? styles['bonds-content-body'] : 'px-4'}>
          <h1 className={styles['bonds-content-title']}>Облигации: календарь на {currentYear}-{nextYear}</h1>
          <p className={styles['bonds-content-under-title']}>
            Дивидендный календарь в {currentYear}-{nextYear} годах. Ближайшие купоны на одну облигацию в{' '}
            {months[new Date().getMonth()]} и последние (прошедшие) выплаченные купоны.
          </p>

          {/* Category Selection */}
          <div className={`${styles['bonds-content-categories-block']} flex flex-wrap gap-2 justify-center`}>
            <div className={`${styles['bcc-category']} flex gap-2`} role="group">
              {[
                { key: 'all', label: 'Все' },
                { key: 'federal loan bonds', label: 'ОФЗ' },
                { key: 'municipal bonds', label: 'Муниципальные' },
                { key: 'Corporate bonds', label: 'Корпоративные' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`${selectedCategory === key ? styles['bcc-category-btn-active'] : styles['bcc-category-btn']}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              className={`${styles['bonds-content-categories-old-btn']} ${selectedCategory === 'old' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('old')}
            >
              Прошедшие купоны
            </button>
          </div>

          {/* Table Content */}
          <div className={isMobile ? 'overflow-x-auto w-full' : `${styles['bonds-content-table']} ${styles['tbl-content']}`}>
              <table cellPadding="0" cellSpacing="0" className={`w-full`}>
                <thead className={styles['tbl-header']}>
                  <tr>
                    <th>Облигация</th>
                    <th>Реестр</th>
                    <th>Лот</th>
                    <th>Купон</th>
                    <th>Купон в %</th>
                    <th>Дата погашения</th>
                  </tr>
                </thead>
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
    </Suspense>
  );
};

export default Bonds;