import { Component, Key } from 'react';
import axios from 'axios';
import '../../styles/Blog.css';
import PostsList from '../../components/Blog/PostsList';
import DataTab from '../../components/Blog/DataTab';
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
		await axios.get("http://127.0.0.1:8000/api/articles/articles/all/")
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

export default Blog;