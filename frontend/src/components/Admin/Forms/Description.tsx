import React, { useCallback, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "../../../styles/components/Admin/AdminDescriptions.css";


interface DescriptionProps {
	value: string;
	onChange: (updatedValue: string) => void;
}

const Description: React.FC<DescriptionProps> = React.memo(({ value = "", onChange }) => {
	const editorContainerRef = useRef<HTMLDivElement | null>(null);
	const quillInstanceRef = useRef<Quill | null>(null);

	const handleTextChange = useCallback(() => {
		if (onChange && quillInstanceRef.current) {
			const html = editorContainerRef.current?.querySelector(".ql-editor")?.innerHTML || "";
			onChange(html);
		}
	}, [onChange]);

	useEffect(() => {
		if (editorContainerRef.current && !quillInstanceRef.current) {
			quillInstanceRef.current = new Quill(editorContainerRef.current, {
				theme: "snow",
				placeholder: "Введите текст облигации...",
				modules: {
					toolbar: [
						[{ header: [1, 2, false] }],
						["bold", "italic", "underline", "link"],
						[{ list: "ordered" }, { list: "bullet" }],
						["blockquote", "code-block"],
						["image"],
					],
				},
			});

			quillInstanceRef.current.on("text-change", handleTextChange);

			if (value) {
				quillInstanceRef.current.root.innerHTML = value;
			}
		}

		return () => {
			if (quillInstanceRef.current) {
				quillInstanceRef.current = null;
			}
		};
	}, [value, handleTextChange]);

	useEffect(() => {
		if (
			quillInstanceRef.current &&
			value !== quillInstanceRef.current.root.innerHTML
		) {
			quillInstanceRef.current.root.innerHTML = value || "";
		}
	}, [value]);

	return (
		<div className="editor-container editor-container_quill">
			<div ref={editorContainerRef} />
		</div>
	);
});

export default Description;
