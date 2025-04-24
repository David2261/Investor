import { useState } from 'react';
// Widgets
import Dropdown from '@/widgets/Dropdown.tsx';
// Entities
import { statusStaff, statusUserActive } from '@/entities/constants/options.ts';

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

	const handleFilterChange = (value: string, name: string) => {
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
				<th className='bg-[#111111] text-[#D9D9D9] text-center text-base py-2 px-4'>Пользователь</th>
				<th className='bg-[#111111] text-[#D9D9D9] text-center text-base py-2 px-4'>Email</th>
				<th className='bg-[#111111] text-[#D9D9D9] text-center text-base py-2 px-4'>
					<Dropdown
						name="isStaff"
						value={filters.isStaff}
						onChange={(value: string) => handleFilterChange(value, 'isStaff')}
						options={statusStaff}
					/>
				</th>
				<th className='bg-[#111111] text-center text-base py-2 px-4'>
					<Dropdown
						name="isActive"
						value={filters.isActive}
						onChange={(value: string) => handleFilterChange(value, 'isActive')}
						options={statusUserActive}
					/>
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