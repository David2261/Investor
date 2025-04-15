import { useState, useContext, FormEvent } from "react";
import axios, { AxiosError } from 'axios';
// API
import { useAllCategories } from "@/api/useAllCategories.tsx";
// Components
import Description from "./Description.tsx";
// Entities
import AuthContext from "@/entities/context/AuthContext.tsx";
// Styles
import "@/styles/components/Admin/AdminFormsArticles.css";

const apiURL = import.meta.env.VITE_API_URL;

interface FormData {
	title: string;
	description: string;
	category: string;
	is_published: boolean;
}

const AdminFormArticles = () => {
	const { authTokens } = useContext(AuthContext);
	const [formData, setFormData] = useState<FormData>({
		title: "",
		description: "",
		category: "",
		is_published: false,
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { data: categories, error } = useAllCategories();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	
		if (!authTokens) {
			alert("Токен авторизации отсутствует.");
			return;
		}
	
		const data = new FormData();
		data.append('title', formData.title);
		data.append('description', formData.description);
		data.append('category', formData.category);
		data.append('is_published', formData.is_published.toString());
	

		if (selectedFile) {
			data.append('img', selectedFile);
		}
	
		try {
			await axios.post(
				`${apiURL}/api/admin/apps/main/articles/create/`,
				data,
				{
					headers: {
						Authorization: `Bearer ${authTokens?.access}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
			// console.log("Article успешно создана:", response.data);
			alert("Статья успешно создана!");
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				console.error("Error creating article:", axiosError.response?.data);
				alert("Произошла ошибка при создании статьи.");
			} else {
				console.error("Unknown error:", error);
				alert("Произошла неизвестная ошибка.");
			}
		}
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-4 p-4 text-white">
				{/* Заголовок статьи */}
				<div className="flex items-center gap-2">
					<label className="w-40 font-bold text-white" htmlFor="title">
						Заголовок статьи:
					</label>
					<div className="flex-grow">
						<input
							id="title"
							type="text"
							placeholder="Название статьи"
							className="border border-gray-400 w-full rounded px-2 py-2"
							required
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
						/>
					</div>
				</div>

				{/* Текст статьи */}
				<div className="flex items-center gap-2">
					<label className="w-40 font-bold text-white pt-1" htmlFor="content">
						Текст статьи:
					</label>
					<div className="flex-grow bg-white">
						<Description
							value={formData.description}
							onChange={(updatedValue) =>
								setFormData((prev) => ({ ...prev, description: updatedValue }))
							}
						/>
					</div>
				</div>

				{/* Категории */}
				<div className="flex items-center gap-2">
					<label className="w-40 font-bold text-white" htmlFor="categories">
						Категории:
					</label>
					<div className="flex-grow">
						<select
							id="category"
							className="border border-gray-400 rounded px-2 py-1"
							required
							value={formData.category}
							onChange={(e) => setFormData({ ...formData, category: e.target.value })}
						>
							<option value="">Выберите категорию</option>
							{categories &&
								categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
						</select>
					</div>
				</div>

				{/* Изображение */}
				<div className="flex items-center gap-2">
					<label className="w-40 font-bold text-white" htmlFor="image">
						Изображение:
					</label>
					<div className="flex-grow flex items-center">
						<input
							id="image"
							type="file"
							accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .tif"
							className="text-white file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-gray-700 file:text-white file:border-gray-400"
							onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
						/>
					</div>
				</div>

				{/* Статус публикации */}
				<div className="flex items-center gap-2">
					<label className="w-40 font-bold text-white" htmlFor="publication">
						Статус публикации:
					</label>
					<div className="flex-grow relative">
						<input
							type="checkbox"
							id="publication"
							className="toggle__input"
							checked={formData.is_published}
							onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
						/>
						<label htmlFor="publication" className="toggle__label"></label>
					</div>
				</div>

				{/* Кнопки управления */}
				<div className="flex flex-row justify-between items-center">
					<div className="flex justify-start">
						<button
							type="submit"
							className="uppercase bg-green-600 text-white px-4 py-2 rounded w-32 hover:bg-green-700">
							сохранить
						</button>
						<button
							type="submit"
							className="mx-4 text-white font-light text-left">
							Сохранить и добавить другой объект
						</button>
					</div>
				</div>
				</div>
			</form>
		</>
	);
};

export default AdminFormArticles;