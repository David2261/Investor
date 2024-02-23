import { Component, FunctionComponent, Key, useState } from 'react';
import axios from 'axios';
import '../../styles/Blog.css';
import PostsList from '../../components/Blog/PostsList';
import Sidebar from '../../components/Blog/Sidebar';
// Example data
// import DATAPOSTS from "../../alpha_test_data/blog_data_posts.json";
// import DATA from '../../alpha_test_data/blog_data_categories.json';


interface BlogAPIType {
	isNavOpen: boolean,
	data: {
		id: Key,
		category: number,
		img: string,
	}[]
}


interface State {
	data: [];
	loaded: boolean;
	placeholder: string;
}

const DataTab: FunctionComponent<{ data: BlogAPIType["data"] }> = (data) =>  {
	const [isNavOpen, setIsNavOpen] = useState(false)
	const changeControllerIconStyle = (isNavOpen: boolean): React.CSSProperties => {
		return {
			color: isNavOpen ? 'red' : 'blue',
		};
	}

	function toggleNavigationBarState() {
		setIsNavOpen(!isNavOpen);
	}

	return (
		<nav className={`fixed pt-4 pl-4 z-20 ${isNavOpen ? 'open' : ''}`}>
			<ul className="transition transform duration-500 text-2xl">
				<button className="px-4" style={changeControllerIconStyle(isNavOpen)} onClick={toggleNavigationBarState} title="open navigation bar">
					{isNavOpen ?
					<span className="material-symbols-outlined" style={changeControllerIconStyle(isNavOpen)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
						</svg>
					</span>
					:
					<span className="material-symbols-outlined" style={changeControllerIconStyle(isNavOpen)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
							<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
						</svg>
					</span>}
				</button>
				{ data ? <Sidebar data={data} isNavOpen={isNavOpen} /> : false }
			</ul>
		</nav>
	)

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
		<DataTab data={this.state.data} />		
		<div className='blog-content'>
			<PostsList data={this.state.data} />
		</div>
	</>
	}
}


export default Blog;