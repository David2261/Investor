import { Key, useState } from 'react';
// Hooks
import { useFetch } from '../../hooks/useFetch.ts';
// Styles
import '../../styles/Blog.css';
// Components
import PostsList from '../../components/Blog/PostsList';
import DataTab from '../../components/Blog/DataTab';
// Widgets
import Loader from '../../widgets/Loader';
// Example data
// import DATAPOSTS from "../../alpha_test_data/blog_data_posts.json";
// import DATA from '../../alpha_test_data/blog_data_categories.json';


interface BlogAPIType {
	id: Key,
	category: {
		name: string,
		slug: string
	},
	title: string,
	img: string | undefined,
	slug: string,
	time_create: string,
	reading_time_minutes: number,
	summary: string
}



const News = () => {
	const { data, error } : {
		data: BlogAPIType | null,
		error: {
			message: string
		}
	} = useFetch("http://127.0.0.1:8000/api/articles/articles/all/");

	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [isOpenFilter, setIsOpenFilter] = useState(false);

	function positionSidebar(props: boolean) {
		setIsOpenSidebar(props);
	}

	function positionFilter(props: boolean) {
		setIsOpenFilter(props);
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!data) {
		return <Loader />;
	}
	return <>
		<h1 className='blog-header'>Новости</h1>
		<div className='relative flex flex-col px-24'>
			<DataTab
				onSidebarChange={(isOpen) => setIsOpenSidebar(isOpen)}
				onFilterChange={(isOpen) => setIsOpenFilter(isOpen)} />
			<div className='grid grid-cols-3 gap-4 pt-4'>
				<div className='col-span-2'>
					<PostsList data={data} />
				</div>
				<div className='col-span-1'></div>
			</div>
		</div>
	</>
}

export default News;