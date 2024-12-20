import React, { useState } from 'react';
import FormatData from '../HomeAdmin/FormatDate.tsx';

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

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target;
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
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 overflow-hidden rounded-l-md opacity-70'>
					<select
						name="date"
						value={filters.date}
						onChange={handleFilterChange}
						className="w-full text-black border p-2 rounded-md"
					>
						<option value="">Все даты</option>
						<option value="today">Сегодня</option>
						<option value="last7days">За последние 7 дней</option>
						<option value="lastMonth">За месяц назад</option>
						<option value="lastYear">За 1 год назад</option>
					</select>
				</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>
					<select
						name="status"
						value={filters.status}
						onChange={handleFilterChange}
						className="border text-black p-2 rounded-md mr-2"
					>
						<option value="">Все статусы</option>
						<option value="Опубликован">Опубликован</option>
						<option value="Не Опубликован">Не Опубликован</option>
					</select>
				</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>Автор</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>Название</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 overflow-hidden rounded-r-md opacity-70'>
					<select
						name="category"
						value={filters.category}
						onChange={handleFilterChange}
						className="w-full text-black border p-2 rounded-md"
					>
						<option value="">Все категории</option>
						{uniqueCategories.map((category, index) => (
							<option key={index} value={category}>{category}</option>
						))}
					</select>
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