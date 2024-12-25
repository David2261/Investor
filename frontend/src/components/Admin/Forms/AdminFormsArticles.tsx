import React, { useState, useEffect, useRef, useMemo } from 'react';
import translations from 'ckeditor5/translations/ru.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import '../../../styles/components/Admin/AdminFormsArticles.css';
import {
    ClassicEditor,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Bookmark,
    Code,
    CodeBlock,
    Essentials,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Paragraph,
    SpecialCharacters,
    Strikethrough,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    Underline
} from 'ckeditor5';


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
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'code',
                        '|',
                        'specialCharacters',
                        'horizontalLine',
                        'link',
                        'bookmark',
                        'insertTable',
                        'highlight',
                        'blockQuote',
                        'codeBlock',
                        'htmlEmbed',
                        '|',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    AutoLink,
                    Autosave,
                    BalloonToolbar,
                    BlockQuote,
                    Bold,
                    Bookmark,
                    Code,
                    CodeBlock,
                    Essentials,
                    Heading,
                    Highlight,
                    HorizontalLine,
                    HtmlEmbed,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    Paragraph,
                    SpecialCharacters,
                    Strikethrough,
                    Table,
                    TableCellProperties,
                    TableProperties,
                    TableToolbar,
                    Underline
                ],
                balloonToolbar: ['bold', 'italic', '|', 'link'],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                initialData:
                    '<h2>Напишите полезную и интересную статью! 🎉</h2>\n',
                language: 'ru',
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                menuBar: {
                    isVisible: true
                },
                placeholder: 'Type or paste your content here!',
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
                },
                translations: [translations]
            }
        };
    }, [isLayoutReady]);

    return (
        <div className="main-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    <div ref={editorRef}>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
                </div>
            </div>
        </div>
    );
}


const AdminFormsArticles = () => {
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
                    <label className="w-40 text-right text-white" htmlFor="title">Заголовок статьи:</label>
                    <div className="flex-grow">
                        <input
                            id="title"
                            type="text"
                            placeholder="Название статьи"
                            className="border border-gray-400 rounded px-2 py-1 text-black"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <label className="w-40 text-right text-white pt-1" htmlFor="content">Текст статьи:</label>
                    <div className="flex-grow">
                        <Description />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className="w-40 text-right text-white" htmlFor="categories">Категории:</label>
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

                <div className="flex items-center gap-2">
                    <label className="w-40 text-right text-white" htmlFor="image">Изображение:</label>
                    <div className="flex-grow flex items-center">
                        <input
                            id="image"
                            type="file"
                            className="text-white file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-gray-700 file:text-white file:border-gray-400"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className="w-40 text-right text-white" htmlFor="publication">Публикация:</label>
                    <div className="flex-grow">
                        <input
							id="publication"
							type="checkbox"
							className="w-5 h-5 border border-gray-400 rounded"
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

export default AdminFormsArticles;
