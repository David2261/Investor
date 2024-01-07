import '../../styles/Blog.css';
import PostsList from '../../components/Blog/PostsList';
import Sidebar from '../../components/Blog/Sidebar';
// Example data
import DATAPOSTS from "../../alpha_test_data/blog_data_posts.json";
import DATA from '../../alpha_test_data/blog_data_categories.json';
import { Key, ReactNode } from 'react';


const Blog = () => {
	const Content: { id: Key; category: string; img: ReactNode; }[] | null = DATA;

	return <>
		<h1 className='blog-header'>NEWS</h1>
		{ Content.length != 0 ? <Sidebar data={Content} /> : false }
		<div className='blog-content' data-name="posts-list">
			<PostsList data={DATAPOSTS} />
		</div>
	</>
};


export default Blog;