import { Fragment, Key, useState } from 'react';
import '/src/styles/Blog.css';
import DATA from '/src/alpha_test_data/blog_data_categories.tsx';
import DATAPOSTS from '/src/alpha_test_data/blog_data_posts.tsx';

// Блок статьи
const postsList = DATAPOSTS.map((value: {
	id: Key;
	img: string | undefined;
	title: string;
	category: string;
}) =>
	<Fragment key={value.id}>
		<div className="blog-content-post">
			<img src={value.img} alt="" />
			<p>{value.title}</p>
			<p className="uppercase">{value.category}</p>
		</div>
	</Fragment>
);

// Блок категории
const sidebar = DATA.map((value: {
	id: Key;
	img: string | undefined;
	category: string;
}) =>
	<Fragment key={value.id}>
		<li className="item" title="home">
		<a href="#home" className="hyper-link">
			<div className="icon-wrapper">
				<span className="material-symbols-outlined">{value.img}</span>
			</div>
			<span className="item-text">{value.category}</span>
		</a>
		</li>
	</Fragment>
);


const Blog = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
	const changeControllerIconStyle = (isNavOpen: boolean): React.CSSProperties => {
		return {
			fontSize: '24px',
			color: isNavOpen ? 'red' : 'blue',
		};
	};

    function toggleNavigationBarState() {
        setIsNavOpen(!isNavOpen);
    }


	return <>
		<h1 className='blog-header'>NEWS</h1>
		<nav id="navigation-bar" className={`${isNavOpen ? 'open' : ''}`} style={changeControllerIconStyle(isNavOpen)}>
			<button onClick={toggleNavigationBarState} className='controller' title="open navigation bar">
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
			<ul className="items-container" data-name="sidebar">
			{sidebar}
			</ul>
		</nav>
		<div className='blog-content' data-name="posts-list">
			{postsList}
		</div>
	</>
};


export default Blog;