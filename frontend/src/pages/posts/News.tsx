import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// Styles
import '@/styles/Blog.css';
// Components
import PostsList from '@/components/Blog/PostsList';
import DataTab from '@/components/Blog/DataTab';
import Filter from '@/components/Blog/Filter';
// Widgets
import Loader from '@/widgets/Loader';
import { getRandomImage } from '@/widgets/getRandomImage';
// API
import { useArticles } from '@/api/useArticles.tsx';

const News = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ sortBy: 'popularity', order: 'desc' });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const { data, loading, error, nextPage, previousPage } = useArticles(
      page,
      filter,
      selectedCategory
  );

  const handleFilterChange = (newFilter: { sortBy: string; order: string }) => {
    setFilter(newFilter);
    setPage(1);
  };

  const handleNextPage = () => {
    if (nextPage) setPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    if (previousPage && page > 1) setPage(prev => prev - 1);
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="blog-header">Новости</h1>
      <Helmet>
        <title>Новости</title>
        <meta name="description" content="News page" />
      </Helmet>
      {!isOpenSidebar ? (
        <div className="relative flex flex-col px-4 md:px-24">
          <div className="flex justify-between">
            <DataTab
              isSidebarChange={isOpenSidebar}
              onSidebarChange={setIsOpenSidebar}
              onSelectCategory={setSelectedCategory}
            />
            <Filter onFilterChange={handleFilterChange} />
          </div>
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="col-span-2">
              <PostsList data={data} />
            </div>
            {data.length > 0 && (
              <div className="col-span-1">
                <div className="text-center px-16 text-4xl">
                  <h1 className="pb-4">Реклама</h1>
                  <img className="px-4" src={getRandomImage()} alt="" />
                  <a href="https://new.donatepay.ru/@1097922" target="_blank" rel="noopener noreferrer">
                    <p className="text-xl">
                      Ваша поддержка значит для меня очень много!<br />
                      Пожертвование
                    </p>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-4 pl-6 pr-24">
          <DataTab
            isSidebarChange={isOpenSidebar}
            onSidebarChange={setIsOpenSidebar}
            onSelectCategory={setSelectedCategory}
          />
          <div className="flex flex-col">
            <div className="ml-auto">
              <Filter onFilterChange={handleFilterChange} />
            </div>
            <PostsList data={data} />
          </div>
        </div>
      )}
      <nav aria-label="Page navigation">
        <ul className="list-style-none flex justify-center">
          <li>
            <button
              className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={handlePreviousPage}
            >
              Previous
            </button>
          </li>
          <li>
            <button
              className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={handleNextPage}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default News;
