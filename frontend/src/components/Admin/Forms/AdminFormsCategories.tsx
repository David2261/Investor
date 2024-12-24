import React from 'react';

const AdminFormsCategories = () => {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center gap-2">
                    <label className="text-white text-xl" htmlFor="category">Категория:</label>
                    <input
                        id="category"
                        type="text"
                        className="border border-gray-400 rounded px-2 py-1 w-full max-w-sm"
                    />
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

export default AdminFormsCategories;
