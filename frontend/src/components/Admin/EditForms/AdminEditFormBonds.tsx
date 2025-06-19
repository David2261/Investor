import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from 'axios';
import { motion } from "motion/react";
import Swal from 'sweetalert2';
// Components
import Description from './Description.tsx';
// Types
import ExtendedBond from '@/types/ExtendedBond';
// Styles
import '@/styles/components/Admin/AdminFormsArticles.module.css';

const apiURL = import.meta.env.VITE_API_URL;


const AdminEditFormBonds = () => {
	const { slug } = useParams();
	const [isOn, setIsOn] = useState(false)
	const [isLoading, setIsLoading] = useState(true);
	const [formData, setFormData] = useState<ExtendedBond>({
		id: 0,
		title: "",
		description: "",
		category: "",
		price: 0,
		maturityDate: "",
		maturityTime: "",
		cupon: 0,
		cupon_percent: 0,
		is_published: false,
		slug: "",
	});

	useEffect(() => {
		const fetchBond = async () => {
			try {
				const res = await axios.get(`${apiURL}/api/admin/apps/main/bonds/edit/${slug}/`, {
					withCredentials: true
				});
				const bondData = res.data;
				setFormData({
					id: bondData.id || "",
					title: bondData.title || "",
					description: bondData.description || "",
					category: bondData.category?.toString() || "",
					price: bondData.price || "",
					maturityDate: bondData.maturity?.split("T")[0] || "",
					maturityTime: bondData.maturity?.split("T")[1]?.slice(0, 5) || "",
					cupon: bondData.cupon || "",
					cupon_percent: bondData.cupon_percent || "",
					is_published: bondData.is_published ?? false,
					slug: bondData.slug || ""
				});
			} catch (err) {
				console.error("Ошибка при загрузке облигации:", err);
				Swal.fire('Ошибка', 'Произошла ошибка при загрузке облигации.', 'error');
			} finally {
				setIsLoading(false);
			}
		};

		fetchBond();
	}, [slug]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!formData.maturityDate || !formData.maturityTime) {
			Swal.fire('Ошибка', 'Укажите дату и время погашения.', 'error');
			return;
		}

		const maturity = new Date(`${formData.maturityDate}T${formData.maturityTime}`).toISOString();

		const data = new FormData();
		data.append('title', formData.title || '');
		data.append('description', formData.description || '');
		data.append('category', formData.category || '');
		data.append('is_published', String(formData.is_published ?? false));
		data.append('price', String(formData.price ?? 0));
		data.append("maturity", maturity);
		data.append('cupon', String(formData.cupon ?? 0));
		data.append('cupon_percent', String(formData.cupon_percent ?? 0));

		try {
			await axios.patch(
				`${apiURL}/api/admin/apps/main/bonds/edit/${slug}/`,
				data, { withCredentials: true });
			Swal.fire('Успешно!', 'Облигация успешно обновлена!', 'success');
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				console.error("Error creating article:", axiosError.response?.data);
				Swal.fire('Ошибка', 'Произошла ошибка при обновлении облигации.', 'error');
			} else {
				console.error("Unknown error:", error);
				Swal.fire('Ошибка', 'Произошла неизвестная ошибка.', 'error');
			}
		}
	};

	const toggleSwitch = () => {
		setIsOn((prev) => !prev);
		setFormData((prev) => {
			const newState = !prev.is_published;
			return { ...prev, is_published: newState };
		});
	};

	if (isLoading) return <div className="text-white p-4">Загрузка статьи...</div>;

	return (
		<>
		<form aria-label="admin-form-bonds" onSubmit={handleSubmit} action="POST">
			<div className="flex flex-col gap-4 p-4 text-white">
				{/* Заголовок облигации */}
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="title">
						Заголовок облигации:
					</label>
					<div className="flex-grow">
						<input
							id="title"
							type="text"
							placeholder="Название облигации"
							className="w-full text-white border border-gray-400 rounded px-2 py-1"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							required
						/>
					</div>
				</div>

				{/* Текст облигации */}
				<div className="flex items-start gap-2">
					<label className="w-48 text-right pt-1 text-white" htmlFor="content">
						Текст облигации:
					</label>
					<div id="content" className="flex-grow bg-white text-black">
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
					<label className="w-48 text-right text-white" htmlFor="categories">
						Категории:
					</label>
					<div className="flex-grow">
						<select
							id="categories"
							className="w-full border border-gray-400 rounded px-2 py-1"
							value={formData.category}
							onChange={(e) => setFormData({ ...formData, category: e.target.value })}
							required
						>
							<option className="text-black" value="Municipal bonds">Муниципальные облигации</option>
							<option className="text-black" value="Corporate bonds">Корпоративные облигации</option>
							<option className="text-black" value="Federal loan bonds">Облигации федеральные займа</option>
						</select>
					</div>
				</div>

				{/* Цена облигаций */}
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="price">
						Цена облигаций:
					</label>
					<div className="flex-grow">
						<input
							id="price"
							type="number"
							className="w-full border border-gray-400 rounded px-2 py-1"
							value={formData.price}
							onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
							required
						/>
					</div>
				</div>

				{/* Публикация */}
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="publication">
						Публикация:
					</label>
					<div
						className={`w-18 h-10 flex items-center p-1 rounded-full cursor-pointer transition-colors duration-300 ${isOn ? 'bg-green-400' : 'bg-gray-300'}`}
						onClick={toggleSwitch}>
						<motion.div
							className="w-8 h-8 bg-white rounded-full shadow-md"
							animate={{ x: isOn ? '100%' : '0%' }}
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						/>
					</div>
				</div>

				{/* Дюрация облигаций */}
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="duration-date">
						Дюрация облигаций:
					</label>
					<div className="flex gap-2 flex-grow">
					<input
						id="duration-date"
						type="date"
						className="w-full border border-gray-400 rounded px-2 py-1"
						value={formData.maturityDate}
						onChange={(e) => setFormData({ ...formData, maturityDate: String(e.target.value) })}
						required
					/>

					<input
						id="duration-time"
						type="time"
						className="w-full border border-gray-400 rounded px-2 py-1"
						value={formData.maturityTime}
						onChange={(e) => setFormData({ ...formData, maturityTime: String(e.target.value) })}
						required
					/>
					</div>
				</div>

				{/* Купонный доход */}
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="coupon-income">
						Купонный доход:
					</label>
					<div className="flex-grow">
						<input
							id="coupon-income"
							type="number"
							className="w-full border border-gray-400 rounded px-2 py-1"
							value={formData.cupon}
							onChange={(e) => setFormData({ ...formData, cupon: Number(e.target.value) })}
							required
						/>
					</div>
				</div>

				{/* Купонный доход в % */}
				<div className="flex items-center gap-2">
					<label className="w-48 text-right text-white" htmlFor="coupon-percent">
						Купонный доход в %:
					</label>
					<div className="flex-grow">
						<input
							id="coupon-percent"
							type="number"
							className="w-full border border-gray-400 rounded px-2 py-1"
							value={formData.cupon_percent}
							onChange={(e) => setFormData({ ...formData, cupon_percent: Number(e.target.value) })}
							required
						/>
					</div>
				</div>

				<div className="flex flex-row justify-between items-center">
					<div className="flex justify-start">
						<button className="uppercase bg-green-600 text-white px-4 py-2 rounded w-32 hover:bg-green-700">
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
		</form>
		</>
	);
};

export default AdminEditFormBonds;
