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

const categoriesList = DATA.map(value =>
	<Fragment key={value.id}>
		<div className="py-4">
			<p className="text-xl text-slate-700 hover:text-green-500">{value.category}</p>
		</div>
	</ Fragment>
);

const Blog = () => {
	return <div className="w-full h-auto">
		<div className="flex flex-row px-10 py-10">
			<div className="basis-1/3 rounded-lg border border-black">
				<div className="px-4 flex flex-col justify-center">
					<h1 className="text-3xl text-center text-bold">Категории</h1>
					{ categoriesList }
				</div>
			</div>
			<div className="basis-2/3 flex flex-col"></div>
		</div>
	</div>
};


export default Blog;