import { Component, Key } from 'react';
import axios from 'axios';
import '../../styles/Blog.css';
import PostsList from '../../components/Blog/PostsList';
import Sidebar from '../../components/Blog/Sidebar';
// Example data
// import DATAPOSTS from "../../alpha_test_data/blog_data_posts.json";
// import DATA from '../../alpha_test_data/blog_data_categories.json';


interface BlogAPIType {
	data: {
		id: Key,
		category: number,
		title: string,
		img: string | undefined,
	}[]
}

interface State {
	data: [];
	loaded: boolean;
	placeholder: string;
}

interface CategoryAPIType {
	data: {
		id: Key,
		name: string,
		slug: string
	}[]
}

class Blog extends Component<{}, State> {
	constructor(props: BlogAPIType) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		}
	}
	
	async componentDidMount() {
		await axios.get("http://127.0.0.1:8000/api/articles/posts/all/")
		.then(response => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
			return (response.data as any);
		})
		.then(data => {
			this.setState(() => {
				return {
					data,
					loaded: true
				};
			});
		});
	}

	render() {
	return <>
		<h1 className='blog-header'>NEWS</h1>
		<DataTab />
		<div className='blog-content'>
			<PostsList data={this.state.data} />
		</div>
	</>
	}
}

// Боковая панель навигации по категориям
class DataTab extends Component<{}, State> {
	constructor(props: CategoryAPIType) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading",
		};
	}

	async componentDidMount() {
		await axios.get('http://127.0.0.1:8000/api/articles/category/all/')
		.then(response => {
			if (response.status > 400) {
				return this.setState(() => {
					return { placeholder: "Something went wrong!" };
				});
			}
			return (response.data);
		})
		.then(data => {
			this.setState(() => {
				return {
					data,
					loaded: true
				};
			});
		});
	}

	render() {
		console.log(this.state.data.map((value) => value))
		return (
		<nav className="fixed pt-4 pl-4 z-20">
			<ul className="transition transform duration-500 text-xl">
				{ this.state.data ? <Sidebar data={this.state.data} /> : false }
			</ul>
		</nav>
		);
	}
}

export default Blog;