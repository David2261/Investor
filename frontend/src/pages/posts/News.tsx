import { Key, useState, useEffect } from 'react';
import axios from 'axios';
// Styles
import '../../styles/Blog.css';
// Components
import PostsList from '../../components/Blog/PostsList';
import DataTab from '../../components/Blog/DataTab';
// Widgets
import Loader from '../../widgets/Loader';

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
	const [totalItems, setTotalItems] = useState(0);
	const [nextPage, setNextPage] = useState(null);
	const [previousPage, setPreviousPage] = useState(null);

	useEffect(() => {
		const fetchNewsArticles = async () => {
			setLoading(true);
			try {
				let url = `http://127.0.0.1:8000/api/articles/articles/all/`;
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
	  }, [page]);
	
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

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  function positionSidebar(props: boolean) {
	setIsOpenSidebar(props);
  }

  function positionFilter(props: boolean) {
	setIsOpenFilter(props);
  }

  if (loading) {
	return <Loader />
  }

  if (error) {
	return <p>Error: {error.message}</p>
  }

  return (
	<>
	  <h1 className="blog-header">Новости</h1>
		<div className="relative flex flex-col px-24">
		  <DataTab
			onSidebarChange={(isOpen) => positionSidebar(isOpen)}
			onFilterChange={(isOpen) => positionFilter(isOpen)}
		  />
		  <div className="grid grid-cols-3 gap-4 pt-4">
			<div className="col-span-2">
			  <PostsList data={data} />
			</div>
			<div className="col-span-1"></div>
		  </div>
		  <nav aria-label="Page navigation">
			<ul className="list-style-none flex">
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
		</div>
	</>
  );
};

export default News;