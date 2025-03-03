import React, { useState, useContext } from 'react';
import axios from 'axios';
// Импортируем контекст авторизации
import AuthContext from "../../../entities/context/AuthContext.tsx";

const apiURL = import.meta.env.VITE_API_URL;

const AdminFormsCategories = () => {
	const { authTokens } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		name: ""
	});

	// Обработчик изменения ввода
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		setFormData({
			...formData,
			[e.target.id]: name,
		});
	};

	// Обработчик отправки формы
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы

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
			console.log("Категория успешно создана:", response.data);
			alert("Категория успешно создана!");
			setFormData({ name: "" }); // Сбрасываем форму
		} catch (error) {
			console.error("Ошибка при создании категории:", error.response?.data || error);
			alert("Произошла ошибка при создании категории.");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
				<div className="flex items-center gap-2">
					<label className="text-white text-xl" htmlFor="category">Категория:</label>
					<input
						id="title"
						type="text"
						placeholder="Название статьи"
						className="border border-gray-400 rounded px-2 py-1 text-black"
						value={formData.name}
						onChange={handleChange}
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
						}}>
							Сохранить и продолжить редактирование
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AdminFormsCategories;