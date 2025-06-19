import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Category {
    name: string;
}

interface AdminTableCategoriesProps {
    data: Category[];
}

const AdminTableCategories: React.FC<AdminTableCategoriesProps> = ({data}) => {
	const apiURL = import.meta.env.VITE_API_URL;
	const [categories, setCategories] = useState<Category[]>(data);

	const handleEdit = async (index: number) => {
        const currentName = categories[index].name;

        const result = await Swal.fire({
            title: 'Изменить название',
            input: 'text',
            inputLabel: 'Новое название категории',
            inputValue: currentName,
            showCancelButton: true,
            confirmButtonText: 'Подтвердить',
            cancelButtonText: 'Отмена',
            inputValidator: (value) => {
                if (!value) {
                    return 'Название не может быть пустым!';
                }
                return null;
            }
        });

        if (result.isConfirmed && result.value) {
            const newName = result.value;
            const updatedCategories = [...categories];
            updatedCategories[index].name = newName;
            setCategories(updatedCategories);

            try {
                await axios.patch(
                    `${apiURL}/api/admin/apps/main/categories/edit/${currentName}/`,
                    { name: newName },
                    { withCredentials: true }
                );
                Swal.fire('Успешно!', 'Название обновлено.', 'success');
            } catch (error) {
                console.error("Не удалось отправить данные на сервер. Error: ", error)
                Swal.fire('Ошибка', 'Не удалось отправить данные на сервер.', 'error');
            }
        }
    };

	return <>
	<table className='w-full h-1/3 border-collapse'>
		<thead className='bg-[#A9A9A9]'>
			<tr className="flex w-1/3">
				<th className='text-center text-[#D9D9D9] text-base py-2 px-4 opacity-70'>Название</th>
			</tr>
		</thead>
		<tbody className="flex flex-col">
			{data.map((value, index) => (
			<tr key={index} className='w-full transition-all cursor-pointer duration-300 ease-in-out text-white transform hover:bg-gray-800' onClick={() => handleEdit(index)}>
				<td className="text-center text-sm py-2">{value.name}</td>
			</tr>
			))}
		</tbody>
	</table>
	</>
}

export default AdminTableCategories;