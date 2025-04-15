import React, { useState } from 'react';
import FormatData from '../HomeAdmin/FormatDate.tsx';
// Widgets
import Dropdown from '@/widgets/Dropdown.tsx';
import { dateOptions, statusOptions } from '@/entities/constants/options.ts';

interface Article {
	title: string;
	author: {
		username: string;
	};
	is_published: boolean;
	category: {
		name: string;
	};
	time_update: string;
}

interface AdminTableArticlesProps {
	data: Article[];
}

const AdminTableArticles: React.FC<AdminTableArticlesProps> = ({data}) => {
	const [filters, setFilters] = useState({
		date: '',
		status: '',
		author: '',
		category: ''
	});

	const isDateInRange = (dateString: string) => {
		const articleDate = new Date(dateString);
		const today = new Date();
		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(today.getDate() - 7);
		const oneMonthAgo = new Date(today);
		oneMonthAgo.setMonth(today.getMonth() - 1);
		const oneYearAgo = new Date(today);
		oneYearAgo.setFullYear(today.getFullYear() - 1);

		switch (filters.date) {
			case 'today':
				return articleDate.toDateString() === today.toDateString();
			case 'last7days':
				return articleDate >= sevenDaysAgo && articleDate <= today;
			case 'lastMonth':
				return articleDate >= oneMonthAgo && articleDate <= today;
			case 'lastYear':
				return articleDate >= oneYearAgo && articleDate <= today;
			default:
				return true;
		}
	};

	const handleFilterChange = (value: string, name: string) => {
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: value
		}));
	};

	const uniqueCategories = Array.from(new Set(data.map(article => article.category.name)));

	const filteredData = data.filter(article => {
		const matchesDate = isDateInRange(article.time_update);
		const matchesStatus = filters.status ? (filters.status === 'Опубликован' ? article.is_published : !article.is_published) : true;
		const matchesAuthor = filters.author ? article.author.username.toLowerCase().includes(filters.author.toLowerCase()) : true;
		const matchesCategory = filters.category ? article.category.name.toLowerCase().includes(filters.category.toLowerCase()) : true;

		return matchesDate && matchesStatus && matchesAuthor && matchesCategory;
	});

	return <>
	<table className='w-full h-1/3'>
		<thead>
			<tr>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="date"
						value={filters.date}
						onChange={(value) => handleFilterChange(value, 'date')}
						options={dateOptions}
					/>
				</th>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="status"
						value={filters.status}
						onChange={(value) => handleFilterChange(value, 'status')}
						options={statusOptions}
					/>
				</th>
				<th className='bg-[#111111] text-center text-[#D9D9D9] text-base py-2 px-4'>Автор</th>
				<th className='bg-[#111111] text-center text-[#D9D9D9] text-base py-2 px-4'>Название</th>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="category"
						value={filters.category}
						onChange={(value) => handleFilterChange(value, 'category')}
						options={[
							{ value: '', label: 'Все категории' },
							...uniqueCategories.map(category => ({ value: category, label: category })),
						]}/>
				</th>
			</tr>
		</thead>
		<tbody>
			{filteredData.map((value, index) => (
			<tr key={index} className='w-full'>
				<td className="text-center text-white text-sm py-2 px-4"><FormatData date={value.time_update} /></td>
				<td className="text-center text-white text-sm py-2 px-4">{value.is_published ? "Опубликован" : "Не Опубликован"}</td>
				<td className="text-center text-white text-sm py-2 px-4">{value.author.username}</td>
				<td className="text-center text-white text-sm py-2">{value.title}</td>
				<td className="text-center text-white text-sm py-2 px-4">{value.category.name}</td>
			</tr>
			))}
		</tbody>
	</table>
	</>
}

export default AdminTableArticles;