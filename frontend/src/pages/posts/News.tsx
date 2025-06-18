import { useMemo, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
// Styles
import '@/styles/Blog.module.css';
// API
import { useArticles } from '@/api/useArticles.tsx';
// Widgets
import { getRandomImage } from '@/widgets/getRandomImage';
import Loader from '@/widgets/Loader';
const NotFound = lazy(() => import('@/widgets/handlerError/404'));
// Components
const PostsList = lazy(() => import('@/components/Blog/PostsList'));
const DataTab = lazy(() => import('@/components/Blog/DataTab'));
const Filter = lazy(() => import('@/components/Blog/Filter'));
const DonationPopup = lazy(() => import('@/components/ModalForms/DonationPopup'));

const News: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const [sortBy, setSortBy] = useState<string>('time_create');
	const [order, setOrder] = useState<string>('desc');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [isDonationOpen, setIsDonationOpen] = useState(false);
	const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

	const filter = useMemo(() => ({ sortBy, order }), [sortBy, order]);

	const handleAdClick = () => {
		setIsDonationOpen(true);
	};

	const handleFilterChange = (newFilter: { sortBy: string; order: string }) => {
		setSortBy(newFilter.sortBy);
		setOrder(newFilter.order);
		setPage(1);
	};

	const { data, loading, error, nextPage, previousPage } = useArticles(page, filter, selectedCategory);

	const handleNextPage = () => {
		if (nextPage) setPage((prev) => prev + 1);
	};

	const handlePreviousPage = () => {
		if (previousPage && page > 1) setPage((prev) => prev - 1);
	};

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <NotFound />;
	}

	return (
		<Suspense fallback={<Loader />}>
			<Helmet>
				<title>Новости</title>
				<meta name="description" content="Новости и статьи" />
			</Helmet>
			{isDonationOpen && <DonationPopup onClose={() => setIsDonationOpen(false)} />}
			<div className={isOpenSidebar ? 'flex flex-row gap-4 pl-6 pr-24' : 'relative flex flex-col px-4 md:px-24'}>
				<div className={isOpenSidebar ? 'flex flex-col' : 'flex justify-between'}>
					<DataTab
						isSidebarChange={isOpenSidebar}
						onSidebarChange={setIsOpenSidebar}
						onSelectCategory={setSelectedCategory}
					/>
					{!isOpenSidebar && <Filter onFilterChange={handleFilterChange} />}
				</div>
				{isOpenSidebar ? (
					<div className="flex flex-col">
						<div className="ml-auto">
							<Filter onFilterChange={handleFilterChange} />
						</div>
						<PostsList data={data} />
					</div>
				) : (
					<div className="grid md:grid-cols-3 gap-4 pt-4">
						<div className="col-span-2">
							<PostsList data={data} />
						</div>
						{Array.isArray(data) && data.length > 0 && (
							<div className="col-span-1">
								<div className="text-center px-16 text-4xl">
									<h1 className="pb-4">Реклама</h1>
									<img
										onClick={handleAdClick}
										className="px-4"
										src={getRandomImage()}
										alt="Реклама"
										loading="lazy"
									/>
									<a
										href="https://new.donatepay.ru/@1097922"
										target="_blank"
										rel="noopener noreferrer nofollow"
										className="text-xl"
									>
										Ваша поддержка значит для меня очень много!<br />
										Пожертвование
									</a>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
			<nav aria-label="Page navigation" className="mt-4">
				<ul className="list-style-none flex justify-center gap-4">
					<li>
						<button
							className="rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white disabled:opacity-50"
							onClick={handlePreviousPage}
							disabled={!previousPage || page <= 1}
						>
							Назад
						</button>
					</li>
					<li>
						<button
							className="rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white disabled:opacity-50"
							onClick={handleNextPage}
							disabled={!nextPage}
						>
							Вперед
						</button>
					</li>
				</ul>
			</nav>
		</Suspense>
	);
};

export default News;