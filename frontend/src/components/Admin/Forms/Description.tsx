import React, { useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface DescriptionProps {
  value: string;
  onChange: (updatedValue: string) => void;
}

const Description: React.FC<DescriptionProps> = React.memo(({ value = "", onChange }) => {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  // Инициализация Quill сразу при рендере
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

    quillInstanceRef.current.on("text-change", () => {
      if (onChange && quillInstanceRef.current) {
        const html = quillInstanceRef.current.root.innerHTML || "";
        onChange(html);
      }
    });

    if (value) {
      quillInstanceRef.current.root.innerHTML = value;
    }
  }

  if (quillInstanceRef.current && value !== quillInstanceRef.current.root.innerHTML) {
    quillInstanceRef.current.root.innerHTML = value || "";
  }

  return (
    <div className="editor-container editor-container_quill">
      <div ref={editorContainerRef} />
    </div>
  );
});

export default Description;
