import { useState } from 'react';
// import { motion } from "motion/react";
import { useNavigate } from 'react-router-dom';
// Components
import FormatData from '../HomeAdmin/FormatDate.tsx';
// Widgets
import Dropdown from '@/widgets/Dropdown.tsx';
import TranslateBondType from '@/widgets/TranslateBondType.tsx';
// Types
import { Bond } from '@/types/Bond';
// Entities
import {
	maturityOptions,
	publishedOptions,
	couponOptions,
	categoryOptions } from '@/entities/constants/options.ts';


interface AdminTableBondsProps {
	data: Bond[];
}

const AdminTableBonds: React.FC<AdminTableBondsProps> = ({data}) => {
	const navigate = useNavigate();
	const [filters, setFilters] = useState({
		maturity: '',
		is_published: '',
		cupon_percent: '',
		category: ''
	});

	const handleFilterChange = (value: string, name: string) => {
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: value
		}));
	};

	const filteredData = data.filter(bond => {
		const couponPercent = bond.cupon_percent;
		const filterCoupon = filters.cupon_percent;

		const couponFilterCondition = 
			(filterCoupon === '' || 	
			(filterCoupon === 'Менее 5%' && couponPercent < 5) || 
			(filterCoupon === '5%-10%' && couponPercent >= 5 && couponPercent <= 10) || 
			(filterCoupon === 'Более 10%' && couponPercent > 10));

		const bondMaturityDate = new Date(bond.maturity);
		const currentDate = new Date();

		const startOfWeek = new Date();
		startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
		startOfWeek.setHours(0, 0, 0, 0);

		const endOfWeek = new Date();
		endOfWeek.setDate(startOfWeek.getDate() + 6);
		endOfWeek.setHours(23, 59, 59, 999);

		const isMatured = bondMaturityDate <= currentDate;
		const filterMaturity = filters.maturity;

		const maturityFilterCondition = 
			(filterMaturity === '' || 
			(filterMaturity === 'Сегодня' && bondMaturityDate.toDateString() === currentDate.toDateString()) ||
			(filterMaturity === 'Эта неделя' && bondMaturityDate >= startOfWeek && bondMaturityDate <= endOfWeek) ||
			(filterMaturity === 'Этот месяц' &&
				bondMaturityDate.getMonth() === currentDate.getMonth() &&
				bondMaturityDate.getFullYear() === currentDate.getFullYear()) ||
			(filterMaturity === 'Этот год' &&
				bondMaturityDate.getFullYear() === currentDate.getFullYear()));

		const publishedFilterCondition =
			(filters.is_published === '' ||
			(filters.is_published === 'Опубликован' && !isMatured) ||
			(filters.is_published === 'Не Опубликован' && isMatured));

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
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="maturity"
						value={filters.maturity}
						onChange={(value) => handleFilterChange(value, 'maturity')}
						options={maturityOptions}
					/>
				</th>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="is_published"
						value={filters.is_published}
						onChange={(value) => handleFilterChange(value, 'is_published')}
						options={publishedOptions}
					/>
				</th>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="cupon_percent"
						options={couponOptions} 
						onChange={(value) => handleFilterChange(value, 'cupon_percent')}
						value={filters.cupon_percent} 
					/>
				</th>
				<th className='bg-[#111111] text-center text-[#D9D9D9] text-base py-2 px-4'>Название</th>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="category"
						options={categoryOptions} 
						onChange={(value) => handleFilterChange(value, 'category')}
						value={filters.category} />
				</th>
			</tr>
		</thead>
		<tbody>
			{filteredData.map((value, index) => (
			<tr
				key={index}
				onClick={() => navigate(`/admin/main/bonds/edit/${value.slug}`)}
				className='transition-all cursor-pointer duration-300 ease-in-out text-white transform hover:bg-gray-800'
				>
				<td className="text-center text-white text-sm py-2 px-4"><FormatData date={value.maturity} /></td>
				<td className="text-center text-white text-sm py-2 px-4">{new Date(value.maturity) > new Date() ? "Опубликован" : "Не Опубликован"}</td>
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