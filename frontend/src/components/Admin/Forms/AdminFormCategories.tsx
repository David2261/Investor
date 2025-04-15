import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from "@/entities/context/AuthContext.tsx";

const apiURL = import.meta.env.VITE_API_URL;

const AdminFormCategories = () => {
	const { authTokens } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		name: ""
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!authTokens) {
			alert("Токен авторизации отсутствует.");
			return;
		}

		try {
			await axios.post(`${apiURL}/api/admin/apps/main/categories/create/`, 
				{ name: formData.name }, {
					headers: {
						Authorization: `Bearer ${authTokens?.access}`,
						"Content-Type": "application/json",
					}
				});
			alert("Категория успешно создана!");
			setFormData({ name: "" });
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error("Ошибка при создании категории:", error.response?.data || error.message);
			} else {
				console.error("Неизвестная ошибка:", error);
			}
			alert("Произошла ошибка при создании категории.");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 p-4">
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="category">Категория:</label>
					<input
						id="title"
						type="text"
						placeholder="Название статьи"
						className="border border-gray-400 rounded px-2 py-1"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						required
						/>
				</div>

				<div className="flex flex-row justify-between items-center">
					<div className="flex justify-start">
						<button type="submit" className="uppercase bg-green-600 text-white px-4 py-2 rounded w-32 hover:bg-green-700">
							Сохранить
						</button>
						<button type="button" className="mx-4 text-white font-light text-left" onClick={() => {
							alert("Сохранено! Добавьте другой объект.");
							setFormData({ name: "" });
						}}>
							Сохранить и добавить другой объект
						</button>
						<button type="button" className="text-white font-light text-left" onClick={() => {
							alert("Сохранено! Продолжайте редактирование.");
							setFormData({ name: `${formData.name}`})
						}}>
							Сохранить и продолжить редактирование
						</button>
					</div>
				</div>
				</div>
			</form>
		</>
	);
};

export default AdminFormCategories;