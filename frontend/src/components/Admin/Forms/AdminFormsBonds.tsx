import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import translations from 'ckeditor5/translations/ru.js';
import 'ckeditor5/ckeditor5.css';
import '../../../styles/components/Admin/AdminFormsArticles.css';

const APICkeditor = import.meta.env.VITE_CKEDITOR_KEY;
const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzYyOTQzOTksImp0aSI6ImVjM2EwOGRlLWFiNGMtNDExYi05MDRhLTBiNDU4Yzc2YWIxYSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjVjZDdmZWQzIn0.ydy-DtATOrDKfQDS_S9GXlBQ-9sagVNtQLKwdhlBeiZl9_ohZ3KzxPmSyr_Dpx_OgeUt0WLE4ExOu3qlYpjziQ';

function Description() {
	const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                licenseKey: APICkeditor,
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'blockQuote',
                        'undo',
                        'redo'
                    ],
                    shouldNotGroupWhenFull: false
                },
                placeholder: 'Введите текст облигации...',
                language: 'ru',
            }
        };
    }, [isLayoutReady]);
	return (
		<div className='editor-container editor-container_classic-editor' ref={editorContainerRef}>
			<div ref={editorRef}>
				{editorConfig && (
					<CKEditor editor={ClassicEditor} config={editorConfig} />
				)}
			</div>
		</div>
	)
}



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

				{/* Текст облигации */}
				<div className="flex items-start gap-2">
					<label className="w-48 text-right pt-1 text-white" htmlFor="content">Текст облигации:</label>
					<div className="flex-grow">
						<Description />
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
