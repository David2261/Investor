import React, { useState } from 'react';
// import { motion } from "motion/react";
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
			<tr key={index}>
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