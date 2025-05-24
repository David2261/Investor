import { useState, useRef, useEffect, useMemo } from 'react';
import '../styles/widgets/Dropdown.css';

interface DropdownProps {
	className?: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	options: Array<{ value: string; label: string }>;
}
  
const Dropdown: React.FC<DropdownProps> = ({ className, name, value, onChange, options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const selectedOption = useMemo(
		() => options.find((option) => option.value === value)?.label || 'Select an option',
		[options, value]
	);
  
	const handleOptionClick = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };
  
	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};
  
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);
  
	return (
		<div
			className={`relative bg-[#A9A9A9] ${className} ${isOpen ? "rounded-t-md" : "rounded-md"}`}
			ref={dropdownRef}
			onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
			<div
				className={`flex justify-between items-center p-2 text-white bg-[#A9A9A9] cursor-pointer rounded-md`}
				onClick={toggleDropdown}
				id={`${name}`} >
				<span className="truncate">{selectedOption}</span>
				<span className="ml-2">{isOpen ? '▲' : '▼'}</span>
			</div>
			{isOpen && (
			<ul className="bg-[#A9A9A9] absolute top-full left-0 w-full z-10 rounded-b-md">
			{options.map((option, index) => (
				<li
					key={option.value}
					className={`text-white cursor-pointer p-2 dropdown-item transition-all duration-300 ease-in-out delay-${index * 60}ms hover:bg-[#B0B0B0]`}
					style={{
						animation: `scaleZ 300ms ${index * 60}ms ease-in-out forwards`,
					}}
					onClick={() => handleOptionClick(option.value)}>
					{option.label}
				</li>
			))}
			</ul>
			)}
		</div>
	);
};

export default Dropdown;