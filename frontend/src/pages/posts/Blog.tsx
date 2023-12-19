import { Fragment, useState } from 'react';
import '/src/styles/Blog.css';

// Примерные категории
const DATA = [
	{
		id: 1,
		category: 'Markets',
		img: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
			<path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
		</svg>
	},
	{
		id: 2,
		category: 'Economy',
		img: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-exchange" viewBox="0 0 16 16">
				<path d="M0 5a5.002 5.002 0 0 0 4.027 4.905 6.46 6.46 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05c0-.046 0-.093.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.46 3.46 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98c-.003.046-.003.097-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5zm16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0zm-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787H8.25zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674l.077.018z"/>
			</svg>
	},
	{
		id: 3,
		category: 'Banks',
		img: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bank" viewBox="0 0 16 16">
				<path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.501.501 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89L8 0ZM3.777 3h8.447L8 1 3.777 3ZM2 6v7h1V6H2Zm2 0v7h2.5V6H4Zm3.5 0v7h1V6h-1Zm2 0v7H12V6H9.5ZM13 6v7h1V6h-1Zm2-1V4H1v1h14Zm-.39 9H1.39l-.25 1h13.72l-.25-1Z"/>
			</svg>
	},
	{
		id: 4,
		category: 'EU',
		img: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-euro" viewBox="0 0 16 16">
				<path d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z"/>
	  		</svg>
	}
];

// Примерные данные статей
const DATAPOSTS = [
	{
		id: 1,
		category: 'Markets',
		title: 'Bearish investor Boaz Weinstein is feeling the pain from this year\'s unexpected stock rally',
		text: "The Enneagram is the latest personality typology to penetrate the zeitgeist. From Hogwarts houses to horoscopes, humans love to categorize ourselves.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 2,
		category: 'NEWS',
		title: 'Enneagrams are the new horoscopes',
		text: "Tracy Anderson memberships are the ultimate Hamptons status symbol. But some devotees say the classes have turned into a chaotic, overpriced mess.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 3,
		category: 'RETAIL',
		title: 'Chaos in the Hamptons: Tracy Anderson devotees gripe about $5,500 mats, $90 classes, and power struggles among \'queen bees\'',
		text: "PAK'nSAVE's money-saving bot used ChatGPT to recommend recipes based on leftover ingredients, but it offered up some potentially deadly combinations.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 4,
		category: 'TECH',
		title: 'Months after an AI deepfake of the pontiff in a puffy coat went viral, Pope Francis is warning about the dangers of AI',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 5,
		category: 'AFRICA',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 6,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 7,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 8,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 9,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 10,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 11,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 12,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 13,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 14,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 15,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 16,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 17,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 18,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 19,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
	{
		id: 20,
		category: 'ECONOMY',
		title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
		text: "The Vatican released a statement where Pope Francis speaks on AI, its potential harm, and need for tech to service humanity.",
		img: "http://dummyimage.com/300x200/4d494d/686a82.jpeg&text=placeholder+image",
	},
];

// Блок статьи
const postsList = DATAPOSTS.map(value =>
	<Fragment key={value.id}>
		<div className="blog-content-post">
			<img src={value.img} alt="" />
			<p>{value.title}</p>
			<p className="uppercase">{value.category}</p>
		</div>
	</Fragment>
);

// Блок категории
const sidebar = DATA.map(value =>
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

    function toggleNavigationBarState() {
        setIsNavOpen(!isNavOpen);
    }

    function changeControllerPosition(isOpen: boolean) {
        return { 'right': isOpen ? '25%' : '50%' };
    }

    function changeControllerIcon(isOpen: boolean) {
        return { innerText: isOpen ? 'close' : 'menu' };
    }


	return <>
		<h1 className='blog-header'>NEWS</h1>
		<nav id="navigation-bar" className={`${isNavOpen ? 'open' : ''}`} style={changeControllerPosition(isNavOpen)}>
			<button onClick={toggleNavigationBarState} className='controller' title="open navigation bar">
				{isNavOpen ?
				<span className="material-symbols-outlined" style={changeControllerIcon(isNavOpen)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
					</svg>
				</span>
				:
				<span className="material-symbols-outlined" style={changeControllerIcon(isNavOpen)}>
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</span>}
			</button>
			<ul className="items-container">
			{sidebar}
			</ul>
		</nav>
		<div className='blog-content'>
			{postsList}
		</div>
	</>
};


export default Blog;