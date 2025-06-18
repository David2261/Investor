import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from 'axios';
// API
import { useAllCategories } from "@/api/useAllCategories.tsx";
// Components
import Description from "./Description.tsx";
// Styles
import "@/styles/components/Admin/AdminFormsArticles.module.css";

const apiURL = import.meta.env.VITE_API_URL;

interface FormData {
	title: string;
	description: string;
	category: string;
	is_published: boolean;
}

const AdminEditFormArticles = () => {
	const { category, slug } = useParams();
	const [formData, setFormData] = useState<FormData>({
		title: "",
		description: "",
		category: "",
		is_published: false,
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { data: categories, error } = useAllCategories();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/admin/apps/main/articles/edit/${category}/${slug}/`, {
					withCredentials: true
				});
				const articleData = res.data;
				setFormData({
					title: articleData.title || "",
					description: articleData.description || "",
					category: articleData.category.toString() || "",
					is_published: articleData.is_published || "",
				});
			} catch (err) {
				console.error("Ошибка при загрузке статьи:", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchArticle();
	}, [category, slug]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData();
		data.append("title", formData.title);
		data.append("description", formData.description);
		data.append("category", formData.category);
		data.append("is_published", formData.is_published.toString());

		if (selectedFile) {
			data.append("img", selectedFile);
		}

		try {
			await axios.patch(
				`${apiURL}/api/admin/apps/main/articles/edit/${category}/${slug}/`,
				data,
				{ withCredentials: true }
			);
			alert("Статья успешно обновлена!");
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error("Ошибка при обновлении статьи:", axiosError.response?.data || error);
			alert("Произошла ошибка при обновлении статьи.");
		}
	};

	if (isLoading) return <div className="text-white p-4">Загрузка статьи...</div>;
	if (error) return <div>Error: {error.message}</div>;

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
					<div className="flex-grow bg-white text-black">
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

export default AdminEditFormArticles;