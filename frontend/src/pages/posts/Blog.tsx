import { Fragment } from 'react';


const DATA = [
	{
		id: 1,
		category: 'Market',
	},
	{
		id: 2,
		category: 'Economy',
	},
	{
		id: 3,
		category: 'Markets',
	},
	{
		id: 4,
		category: 'EU',
	},
	{
		id: 5,
		category: 'North America',
	},
	{
		id: 6,
		category: 'South America',
	},
	{
		id: 7,
		category: 'Asia',
	},
	{
		id: 8,
		category: 'Pacific Islands',
	},
	{
		id: 9,
		category: 'Africa',
	},
	{
		id: 10,
		category: 'Middle East',
	},
];

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

const categoriesList = DATA.map(value =>
	<Fragment key={value.id}>
		<div className="py-4 flex hover:bg-neutral-950 justify-center">
			<p className="text-xl text-slate-700 hover:text-white">{value.category}</p>
		</div>
	</ Fragment>
);

const postsList = DATAPOSTS.map(value =>
	<Fragment key={value.id}>
		<div className="p-4">
			<img className="rounded-lg" src={value.img} alt="" />
			<p className="text-lg text-slate-700 hover:text-red-700">{value.title}</p>
			<p className="text-lg text-slate-400 uppercase">{value.category}</p>
		</div>
	</Fragment>
);

type Props = {};

const Blog = (props: Props) => {
	return <div className="w-full h-auto font-mono">
		<h1 className="flex flex-row justify-center text-7xl py-10 font-bold uppercase">news</h1>
		<div className="grid md:grid-cols-3 gap-4 px-10 py-10">
			<div className="pt-4 col-span-2 md:col-span-1">
				<div className="px-4 grid grid-cols-4 md:flex md:flex-col justify-center md:border border-b border-slate-200">
					<h1 className="text-3xl col-span-4 text-bold">Категории</h1>
					{ categoriesList }
				</div>
			</div>
			<div className="col-span-2">
				<div className="grid grid-cols-2 gap-6">
					{ postsList }
				</div>
			</div>
		</div>
	</div>
};


export default Blog;