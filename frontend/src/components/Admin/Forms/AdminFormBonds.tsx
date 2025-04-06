import { useState, useContext, FormEvent } from "react";
import axios, { AxiosError } from 'axios';
import { motion } from "motion/react";
// Entities
import AuthContext from "@/entities/context/AuthContext.tsx";
// Components
import Description from './Description.tsx';
// Types
import ExtendedBond from '@/types/ExtendedBond';
// Styles
import '@/styles/components/Admin/AdminFormsArticles.css';

const apiURL = import.meta.env.VITE_API_URL;


const AdminFormBonds = () => {
	const { authTokens } = useContext(AuthContext);
	const [isOn, setIsOn] = useState(false)
	const [formData, setFormData] = useState<ExtendedBond>({
		title: "",
		description: "",
		category: "",
		price: 0,
		maturityDate: "",
    	maturityTime: "",
		cupon: 0,
		cupon_percent: 0,
		is_published: false,
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!authTokens) {
			alert("Токен авторизации отсутствует.");
			return;
		}

		const maturity = new Date(`${formData.maturityDate}T${formData.maturityTime}`).toISOString();

		const data = new FormData();
		data.append('title', formData.title);
		data.append('description', formData.description);
		data.append('category', formData.category);
		data.append('is_published', formData.is_published.toString());
		data.append('price', formData.price.toString());
		data.append("maturity", maturity);
		data.append('cupon', formData.cupon.toString());
		data.append('cupon_percent', formData.cupon_percent.toString());

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

	const toggleSwitch = () => {
		setIsOn((prev) => !prev);
		setFormData((prev) => {
			const newState = !prev.is_published;
			return { ...prev, is_published: newState };
		});
	};


	// Styles for is_publisher
	const container = {
        width: 100,
        height: 50,
        backgroundColor: isOn ? "#4CAF50" : "var(--hue-3-transparent)",
        borderRadius: 50,
        cursor: "pointer",
        display: "flex",
        padding: 10,
        justifyContent: isOn ? "flex-end" : "flex-start",
        transition: "background-color 0.3s ease",
    };

    const handle = {
        width: 50,
        height: 50,
        backgroundColor: "#9911ff",
        borderRadius: "50%",
        transition: "transform 0.3s ease",
    };

	return (
		<>
		<form  onSubmit={handleSubmit} action="POST">
			<div className="flex flex-col gap-4 p-4">
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
							className="w-full border border-gray-400 rounded px-2 py-1 text-black"
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
					<div id="content" className="flex-grow bg-white">
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
							className="w-full border border-gray-400 rounded px-2 py-1 text-black"
							value={formData.category}
							onChange={(e) => setFormData({ ...formData, category: e.target.value })}
							required
						>
							<option value="Municipal bonds">Муниципальные облигации</option>
							<option value="Corporate bonds">Корпоративные облигации</option>
							<option value="Federal loan bonds">Облигации федеральные займа</option>
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
							className="w-full border border-gray-400 rounded px-2 py-1 text-black"
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
						className="w-full border border-gray-400 rounded px-2 py-1 text-black"
						value={formData.maturityDate}
						onChange={(e) => setFormData({ ...formData, maturityDate: String(e.target.value) })}
						required
					/>

					<input
						id="duration-time"
						type="time"
						className="w-full border border-gray-400 rounded px-2 py-1 text-black"
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
							className="w-full border border-gray-400 rounded px-2 py-1 text-black"
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
							className="w-full border border-gray-400 rounded px-2 py-1 text-black"
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

export default AdminFormBonds;
