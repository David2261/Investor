import React, { useRef, useEffect } from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';


const Description = React.memo(() => {
    const editorContainerRef = useRef<HTMLDivElement | null>(null);
    const quillInstanceRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorContainerRef.current && !quillInstanceRef.current) {
            quillInstanceRef.current = new Quill(editorContainerRef.current, {
                theme: 'snow',
                placeholder: 'Введите текст облигации...',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'link'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['blockquote', 'code-block'],
                        ['image'],
                    ],
                    imageResize: {
                        modules: ['Resize', 'DisplaySize'],
                    },
                },
            });
        }

        return () => {
            if (quillInstanceRef.current) {
                quillInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <div className="text-black editor-container editor-container_quill">
            <div ref={editorContainerRef} />
        </div>
    );
});

export default Description;