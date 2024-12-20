import React from 'react';

interface Category {
    name: string;
}

interface AdminTableCategoriesProps {
    data: Category[];
}

const AdminTableCategories: React.FC<AdminTableCategoriesProps> = ({data}) => {
	return <>
	<table className='w-full h-1/3'>
		<thead>
			<tr>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>Название</th>
			</tr>
		</thead>
		<tbody>
			{data.map((value, index) => (
			<tr key={index} className='w-full'>
				<td className="text-center text-white text-sm py-2">{value.name}</td>
			</tr>
			))}
		</tbody>
	</table>
	</>
}

export default AdminTableCategories;