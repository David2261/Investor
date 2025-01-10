import { useState, useContext } from "react";
import axios from 'axios';
// API
import { useAllCategories } from "../../../api/useAllCategories.tsx";
// Components
import Description from "./Description";
// Entities
import AuthContext from "../../../entities/context/AuthContext.tsx";
// Styles
import "../../../styles/components/Admin/AdminFormsArticles.css";

const apiURL = import.meta.env.VITE_API_URL;

const AdminFormsArticles = () => {
	const { authTokens } = useContext(AuthContext);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		is_published: false,
	});
	const [selectedFile, setSelectedFile] = useState(null);
	const { data: categories, error } = useAllCategories();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value, type, checked } = e.target;
		setFormData({
			...formData,
			[id]: type === "checkbox" ? checked : value,
		});
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(e.target.files[0]);
	};

	const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		e.preventDefault();
		
		const data = new FormData();
		data.append("title", formData.title);
		data.append("description", formData.description);
		data.append("category", formData.category);
		data.append("is_published", formData.is_published);
		if (selectedFile) {
			data.append("img", selectedFile);
		}

		try {
			console.log("Auth Tokens:", authTokens);
			const response = await axios.post(`${apiURL}/api/admin/apps/main/articles/create/`, 
				data, {
				headers: {
					Authorization: `Bearer ${authTokens}`,
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Article created successfully:", response.data);
			alert("Статья успешно создана!");
		} catch (error) {
			console.error("Error creating article:", error.response?.data || error);
			alert("Произошла ошибка при создании статьи.");
		}
	};
  return (
	<>
	  <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
		{/* Заголовок статьи */}
		<div className="flex items-center gap-2">
		  <label className="w-40 text-right text-white" htmlFor="title">
			Заголовок статьи:
		  </label>
		  <div className="flex-grow">
			<input
			  id="title"
			  type="text"
			  placeholder="Название статьи"
			  className="border border-gray-400 rounded px-2 py-1 text-black"
			  value={formData.title}
			  onChange={handleChange}
			/>
		  </div>
		</div>

		{/* Текст статьи */}
		<div className="flex items-start gap-2">
		  <label className="w-40 text-right text-white pt-1" htmlFor="content">
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
		  <label className="w-40 text-right text-white" htmlFor="categories">
			Категории:
		  </label>
		  <div className="flex-grow">
			<select
				id="category"
				className="border border-gray-400 rounded px-2 py-1 text-black"
				value={formData.category}
				onChange={handleChange}
				required>
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
		  <label className="w-40 text-right text-white" htmlFor="image">
			Изображение:
		  </label>
		  <div className="flex-grow flex items-center">
			<input
			  id="image"
			  type="file"
			  className="text-white file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-gray-700 file:text-white file:border-gray-400"
			  onChange={handleFileChange}
			/>
		  </div>
		</div>

		{/* Публикация */}
		<div className="flex items-center gap-2">
		  <label className="w-40 text-right text-white" htmlFor="publication">
			Публикация:
		  </label>
		  <div className="flex-grow">
			<input
			  id="publication"
			  type="checkbox"
			  className="w-5 h-5 border border-gray-400 rounded"
			  checked={formData.is_published}
			  onChange={handleChange}
			/>
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
			<button className="mx-4 text-white font-light text-left">
			  Сохранить и добавить другой объект
			</button>
			<button className="text-white font-light text-left">
			  Сохранить и продолжить редактирование
			</button>
		  </div>
		</div>
	  </form>
	</>
  );
};

export default AdminFormsArticles;
