import { Key, useState, useEffect } from 'react';
import axios from 'axios';
// Styles
import '../../styles/Blog.css';
// Components
import PostsList from '../../components/Blog/PostsList';
import DataTab from '../../components/Blog/DataTab';
import Filter from '../../components/Blog/Filter';
// Widgets
import Loader from '../../widgets/Loader';
import { getRandomImage } from '../../widgets/getRandomImage';

interface BlogAPIType {
	id: Key;
	category: {
		name: string;
		slug: string;
	};
	title: string;
	img: string | undefined;
	slug: string;
	time_create: string;
	reading_time_minutes: number;
	summary: string;
}

const News = () => {
	const [page, setPage] = useState(1);
	const [data, setData] = useState<BlogAPIType[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [, setTotalItems] = useState(0);
	const [nextPage, setNextPage] = useState(null);
	const [previousPage, setPreviousPage] = useState(null);
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [, setIsOpenFilter] = useState(false);
	const apiUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchNewsArticles = async () => {
			setLoading(true);
			try {
				let url = `${apiUrl}/api/articles/articles/all/`;
				if (page > 1) {
					url += `?page=${page}`;
				}
				const response = await axios.get(url);
				setData(response.data.results);
				setTotalItems(response.data.count);
				setNextPage(response.data.next);
				setPreviousPage(response.data.previous);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchNewsArticles();
	}, [apiUrl, page]);
	
	const handleNextPage = () => {
	if (nextPage != null) {
		setPage(page + 1);
	}
	};

	const handlePreviousPage = () => {
	if (previousPage != null) {
		setPage(page - 1);
	}
	};

  if (loading) {
	return <Loader />
  }

  if (error) {
	return <p>Error: {error.message}</p>
  }

  return (
	<>
	<h1 className="blog-header">Новости</h1>
		{!isOpenSidebar ?
		<div className="relative flex flex-col px-24">
			<div className="flex justify-between">
				<DataTab
					isSidebarChange={isOpenSidebar}
					onSidebarChange={setIsOpenSidebar}
				/>
				<Filter onFilterChange={setIsOpenFilter} />
			</div>
			<div className="grid grid-cols-3 gap-4 pt-4">
				<div className="col-span-2">
				<PostsList data={data} />
				</div>
				<div className="col-span-1">
					<div className='text-center px-16 text-4xl'>
						<h1 className='pb-4'>Реклама</h1>
						<img className='px-4' src={getRandomImage()} alt="" />
						<a href="https://new.donatepay.ru/@1097922" target='_blank' rel="noopener noreferrer">
							<p className="text-xl">
								Ваша поддержка значит для меня очень много!<br />
								Пожертвование
							</p>
						</a>
					</div>
				</div>
			</div>
		</div>
		:
		<div className='flex flex-row gap-4 pl-6 pr-24'>
			<DataTab
				isSidebarChange={isOpenSidebar}
				onSidebarChange={setIsOpenSidebar} />
			<div className="flex flex-col">
				<div className='ml-auto'>
					<Filter onFilterChange={setIsOpenFilter} />
				</div>
				<PostsList data={data} />
			</div>
		</div>
		}
		<nav aria-label="Page navigation">
			<ul className="list-style-none flex justify-center">
				<li>
					<button
						className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						onClick={handlePreviousPage}>Previous</button>
				</li> 
				<li>
					<button
						className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
						onClick={handleNextPage}>Next</button>
				</li>
			</ul>
		</nav>
	</>
  );
};

export default News;