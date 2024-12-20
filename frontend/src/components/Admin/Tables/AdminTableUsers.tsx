import React, { useState } from 'react';

interface User {
	username: string;
	email: string;
	is_staff: boolean;
	is_active: boolean;
}

interface AdminTableUsersProps {
	data: User[];
}

const AdminTableUsers: React.FC<AdminTableUsersProps> = ({data}) => {
	const [filters, setFilters] = useState({
		isStaff: '',
		isActive: ''
	});

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target;
		setFilters(prevFilters => ({
			...prevFilters,
			[name]: value
		}));
	};

	const filteredData = data.filter(user => {
		const matchesIsStaff = filters.isStaff ? (filters.isStaff === 'yes' ? user.is_staff : !user.is_staff) : true;
		const matchesIsActive = filters.isActive ? (filters.isActive === 'active' ? user.is_active : !user.is_active) : true;

		return matchesIsStaff && matchesIsActive;
	});

	return <>
	<table className='w-full h-1/3'>
		<thead>
			<tr>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 rounded-l-md opacity-70'>Пользователь</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>Email</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>
					<select
						name="isStaff"
						value={filters.isStaff}
						onChange={handleFilterChange}
						className="border text-black p-2 rounded-md mr-2"
					>
						<option value="">Все сотрудники</option>
						<option value="yes">Сотрудник</option>
						<option value="no">Не сотрудник</option>
					</select>
				</th>
				<th className='bg-[#A9A9A9] text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>
					<select
						name="isActive"
						value={filters.isActive}
						onChange={handleFilterChange}
						className="border text-black p-2 rounded-md"
					>
						<option value="">Все разрешения</option>
						<option value="active">Активен</option>
						<option value="blocked">Заблокирован</option>
					</select>
				</th>
			</tr>
		</thead>
		<tbody>
			{filteredData.map((value, index) => (
			<tr key={index} className='w-full'>
				<td className="text-center text-white text-sm py-2 px-4">{value.username}</td>
				<td className="text-center text-white text-sm py-2 px-4">{value.email}</td>
				<td className="text-center text-white text-sm py-2 px-4">{value.is_staff ? "Сотрудник" : "Нет"}</td>
				<td className="text-center text-white text-sm py-2">{value.is_active ? "Активен" : "Заблокирован"}</td>
			</tr>
			))}
		</tbody>
	</table>
	</>
}

export default AdminTableUsers;