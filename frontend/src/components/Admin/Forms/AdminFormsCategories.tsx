import React, { useState, useContext } from 'react';
import axios from 'axios';
// Entities
import AuthContext from "../../../entities/context/AuthContext.tsx";

const apiURL = import.meta.env.VITE_API_URL;

const AdminFormsCategories = () => {
	const { authTokens } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		name: ""
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!authTokens) {
			alert("Токен авторизации отсутствует.");
			return;
		}

		try {
			const response = await axios.post(`${apiURL}/api/admin/apps/main/categories/create/`, 
				{ name: formData.name }, {
					headers: {
						Authorization: `Bearer ${authTokens.trim()}`,
						"Content-Type": "application/json",
					}
				});
			console.log("Category created successfully:", response.data);
			alert("Категория успешно создана!");
			setFormData({ name: "" });
		} catch (error) {
			console.error("Error creating category:", error.response?.data || error);
			alert("Произошла ошибка при создании категории.");
		}
	};

	return (
		<>
			<div className="flex flex-col gap-4 p-4">
				<div className="flex items-center gap-2">
					<label className="text-white text-xl" htmlFor="category">Категория:</label>
					<input
						id="category"
						type="text"
						className="border border-gray-400 rounded px-2 py-1 w-full max-w-sm"
						value={formData.name}
                        onChange={handleChange}
                        required
					/>
				</div>

				<div className="flex flex-row justify-between items-center">
					<div className="flex justify-start">
						<button type="submit" className="uppercase bg-green-600 text-white px-4 py-2 rounded w-32 hover:bg-green-700">
							сохранить
						</button>
						<button className="mx-4 text-white font-light text-left">
							Сохранить и добавить другой объект
						</button>
						<button className="text-white font-light text-left">
							Сохранить и продолжить редактирование
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminFormsCategories;
