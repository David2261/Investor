import React, { useEffect, useRef, ReactNode } from 'react';
import '@/styles/widgets/buttons/AdminButton.css';

interface AdminButtonProps {
    onClick: () => void;
    children: ReactNode;
}

const AdminButton: React.FC<AdminButtonProps> = ({ onClick, children }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const button = buttonRef.current;

        const updatePosition = (e: PointerEvent) => {
            if (button) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                button.style.setProperty("--x", x.toFixed(2));
                button.style.setProperty("--y", y.toFixed(2));
            }
        };

        const handlePointerEnter = (e: PointerEvent) => {
            if (button) {
                button.classList.add("hovered");
                updatePosition(e);
                button.style.setProperty("--active", "1.5");
            }
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (button && button.classList.contains("hovered")) {
                updatePosition(e);
            }
        };

        const handlePointerLeave = () => {
            if (button) {
                button.classList.remove("hovered");
                button.style.setProperty("--active", "0");
            }
        };

        const handlePointerDown = () => {
            if (button) {
                button.style.setProperty("--active", "3");
            }
        };

        const handlePointerUp = () => {
            if (button) {
                button.style.setProperty("--active", "1.5");
            }
        };

        if (button) {
            button.addEventListener("pointerenter", handlePointerEnter);
            button.addEventListener("pointermove", handlePointerMove);
            button.addEventListener("pointerleave", handlePointerLeave);
            button.addEventListener("pointerdown", handlePointerDown);
            button.addEventListener("pointerup", handlePointerUp);
        }

        return () => {
            if (button) {
                button.removeEventListener("pointerenter", handlePointerEnter);
                button.removeEventListener("pointermove", handlePointerMove);
                button.removeEventListener("pointerleave", handlePointerLeave);
                button.removeEventListener("pointerdown", handlePointerDown);
                button.removeEventListener("pointerup", handlePointerUp);
            }
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            className="blend-button">
            <span className="back"><span></span></span>
            <span className="label">{children}</span>
        </button>
    );
};

export default AdminButton;