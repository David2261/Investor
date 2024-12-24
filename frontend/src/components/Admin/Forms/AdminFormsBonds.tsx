import React from 'react';

const AdminFormsBonds = () => {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="title">Заголовок облигации:</label>
                    <div className="flex-grow">
                        <input
                            id="title"
                            type="text"
                            placeholder="Название облигации"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        />
                    </div>
                </div>

                {/* Автор */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="author">Автор:</label>
                    <div className="flex-grow">
                        <select
                            id="author"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        >
                            <option>----------</option>
                            <option>Автор 1</option>
                            <option>Автор 2</option>
                        </select>
                    </div>
                </div>

                {/* Текст облигации */}
                <div className="flex items-start gap-2">
                    <label className="w-48 text-right pt-1 text-white" htmlFor="content">Текст облигации:</label>
                    <div className="flex-grow">
                        <textarea
                            id="content"
                            rows={5}
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        ></textarea>
                    </div>
                </div>

                {/* Категории */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="categories">Категории:</label>
                    <div className="flex-grow">
                        <select
                            id="categories"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        >
                            <option>----------</option>
                            <option>Категория 1</option>
                            <option>Категория 2</option>
                        </select>
                    </div>
                </div>

                {/* Цена облигаций */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="price">Цена облигаций:</label>
                    <div className="flex-grow">
                        <input
                            id="price"
                            type="number"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        />
                    </div>
                </div>

                {/* Публикация */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="publication">Публикация:</label>
                    <div className="flex-grow">
                        <input
                            id="publication"
                            type="checkbox"
                            className="w-5 h-5 border border-gray-400 rounded"
                        />
                    </div>
                </div>

                {/* Дюрация облигаций */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="duration">Дюрация облигаций:</label>
                    <div className="flex gap-2 flex-grow">
                        <input
                            id="duration-date"
                            type="date"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        />
                        <input
                            id="duration-time"
                            type="time"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        />
                    </div>
                </div>

                {/* Купонный доход */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="coupon-income">Купонный доход:</label>
                    <div className="flex-grow">
                        <input
                            id="coupon-income"
                            type="number"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
                        />
                    </div>
                </div>

                {/* Купонный доход в % */}
                <div className="flex items-center gap-2">
                    <label className="w-48 text-right text-white" htmlFor="coupon-percent">Купонный доход в %:</label>
                    <div className="flex-grow">
                        <input
                            id="coupon-percent"
                            type="number"
                            className="w-full border border-gray-400 rounded px-2 py-1 text-black"
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
        </>
    );
};

export default AdminFormsBonds;
