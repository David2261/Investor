import Description from "./Description";
import "../../../styles/components/Admin/AdminFormsArticles.css";


const AdminFormsArticles = () => {
  return (
	<>
	  <div className="flex flex-col gap-4 p-4">
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
			/>
		  </div>
		</div>

		{/* Текст статьи */}
		<div className="flex items-start gap-2">
		  <label className="w-40 text-right text-white pt-1" htmlFor="content">
			Текст статьи:
		  </label>
		  <div className="flex-grow bg-white">
			<Description />
		  </div>
		</div>

		{/* Категории */}
		<div className="flex items-center gap-2">
		  <label className="w-40 text-right text-white" htmlFor="categories">
			Категории:
		  </label>
		  <div className="flex-grow">
			<select
			  id="categories"
			  className="border border-gray-400 rounded px-2 py-1 text-black"
			>
			  <option>----------</option>
			  <option>Категория 1</option>
			  <option>Категория 2</option>
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
			/>
		  </div>
		</div>

		{/* Кнопки управления */}
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
	</>
  );
};

export default AdminFormsArticles;
