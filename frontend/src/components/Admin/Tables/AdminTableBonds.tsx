import React, { useState } from 'react';
import FormatData from '../HomeAdmin/FormatDate.tsx';
import TranslateBondType from '../../../widgets/TranslateBondType.tsx';

interface Bond {
	title: string;
	is_published: boolean;
	category: string;
	maturity: string;
	cupon_percent: string;
}

interface AdminTableBondsProps {
	data: Bond[];
}

const AdminTableBonds: React.FC<AdminTableBondsProps> = ({data}) => {
	const [filters, setFilters] = useState({
		maturity: '',
		is_published: '',
		cupon_percent: '',
		category: ''
	});

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: value
		}));
	};

	const filteredData = data.filter(bond => {
		const couponPercent = parseFloat(bond.cupon_percent);
		const filterCoupon = filters.cupon_percent;

		const couponFilterCondition = 
			(filterCoupon === '' || 
			(filterCoupon === 'Менее 5%' && couponPercent < 5) || 
			(filterCoupon === '5%-10%' && couponPercent >= 5 && couponPercent <= 10) || 
			(filterCoupon === 'Более 10%' && couponPercent > 10));

		const bondMaturityDate = new Date(bond.maturity);
		const currentDate = new Date();
		const filterMaturity = filters.maturity;

		const maturityFilterCondition = 
			(filterMaturity === '' || 
			(filterMaturity === 'Сегодня' && bondMaturityDate.toDateString() === currentDate.toDateString()) ||
			(filterMaturity === 'Эта неделя' && 
				bondMaturityDate >= new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())) && 
				bondMaturityDate <= new Date(currentDate.setDate(currentDate.getDate() + 6 - currentDate.getDay()))) ||
			(filterMaturity === 'Этот месяц' && 
				bondMaturityDate.getMonth() === currentDate.getMonth() && 
				bondMaturityDate.getFullYear() === currentDate.getFullYear()) ||
			(filterMaturity === 'Этот год' && 
				bondMaturityDate.getFullYear() === currentDate.getFullYear()));
	
		const publishedFilterCondition = 
				(filters.is_published === '' || 
				(filters.is_published === 'Опубликован' && bond.is_published) || 
				(filters.is_published === 'Не Опубликован' && !bond.is_published));

		return (
			maturityFilterCondition &&
			publishedFilterCondition &&
			couponFilterCondition &&
			(filters.category === '' || bond.category.includes(filters.category))
		);
	});

	return <>
	<table className='w-full h-1/3'>
		<thead>
			<tr>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 rounded-l-md opacity-70'>
					<select
						name="maturity"
						value={filters.maturity}
						onChange={handleFilterChange}
						className="rounded-md text-black border p-2 mr-2"
					>
						<option value="">Все дюрации</option>
						<option value="Сегодня">Сегодня</option>
						<option value="Эта неделя">Эта неделя</option>
						<option value="Этот месяц">Этот месяц</option>
						<option value="Этот год">Этот год</option>
					</select>
				</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>
					<select
						name="is_published"
						value={filters.is_published}
						onChange={handleFilterChange}
						className="rounded-md text-black border p-2 mr-2"
					>
						<option value="">Все облигации</option>
						<option value="Опубликован">Опубликован</option>
						<option value="Не Опубликован">Не Опубликован</option>
					</select>
				</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>
					<select
						name="cupon_percent"
						value={filters.cupon_percent}
						onChange={handleFilterChange}
						className="rounded-md text-black border p-2 mr-2"
					>
						<option value="">Все купоны</option>
						<option value="Менее 5%">Менее 5%</option>
						<option value="5%-10%">5%-10%</option>
						<option value="Более 10%">Более 10%</option>
					</select>
				</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>Название</th>
				<th className='overflow-hidden bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 rounded-r-md opacity-70'>
					<select
						name="category"
						value={filters.category}
						onChange={handleFilterChange}
						className="w-full text-black rounded-md border p-2"
					>
						<option value="">Все категории</option>
						<option value="Corporate bonds">Корпоративные облигации</option>
						<option value="municipal bonds">Муниципальные облигации</option>
						<option value="federal loan bonds">ОФЗ</option>
					</select>
				</th>
			</tr>
		</thead>
		<tbody>
			{filteredData.map((value, index) => (
			<tr key={index} className='w-full'>
				<td className="text-center text-white text-sm py-2 px-4"><FormatData date={value.maturity} /></td>
				<td className="text-center text-white text-sm py-2 px-4">{value.is_published ? "Опубликован" : "Не Опубликован"}</td>
				<td className="text-center text-white text-sm py-2 px-4">{value.cupon_percent}</td>
				<td className="text-center text-white text-sm py-2">{value.title}</td>
				<td className="text-center text-white text-sm py-2 px-4">{TranslateBondType(value.category)}</td>
			</tr>
			))}
		</tbody>
	</table>
	</>
}

export default AdminTableBonds;