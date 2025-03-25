import { useState, FunctionComponent } from "react";
// Components
import Sidebar from "./Sidebar";
// API
import { useAllCategories } from '@/api/useAllCategories.tsx';
// Styles
import '@/styles/components/Blog/DataTabStyles.css';
// Assets
import homeBlack from '@/assets/icons/menu_black.svg';
import closeBlack from '@/assets/icons/close_black.svg';
import searchBlack from '@/assets/icons/search_black.svg';

interface DataTabType {
	isSidebarChange: boolean;
	onSidebarChange: (isOpen: boolean) => void;
	onSelectCategory: (category: string) => void;
}

// Боковая панель навигации по категориям
const DataTab: FunctionComponent<DataTabType> = ({ isSidebarChange, onSidebarChange, onSelectCategory }) => {
	const { data, dataCount, error } = useAllCategories();
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const categories = !isOpen && dataCount > 5 ? data.slice(0, 5) : data;

	const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const openModal = () => onSidebarChange(true);
    const closeModal = () => {
        closeAllCategories();
        onSidebarChange(false);
    };
    const openAllCategories = () => setIsOpen(true);
    const closeAllCategories = () => setIsOpen(false);

	return !isSidebarChange ?
		<button className="data-tab-sidebar-close-btn" onClick={openModal}>
			<img src={homeBlack} />
			Категории
		</button>
		:
		<div className="absolute bg-white md:flex ml-auto pl-4 sm:w-auto xl:w-full">
			<div className="flex flex-col w-full">
				<div className="mb-4">
					<div className="flex justify-end mb-4">
						<button onClick={closeModal} className="py-2 px-4 rounded-md">
							<img src={closeBlack} />
						</button>
					</div>
					<div className="pr-4 relative">
						<img className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" src={searchBlack} />
						<input
							type="text"
							placeholder="Поиск..."
							className="w-full bg-white border-b py-2 px-12 focus:outline-none focus:ring-2 focus:ring-opacity-50"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)} />
					</div>
				</div>
				<div className="pr-4">
					<div className="grid gap-4 sticky">
						<div className="overflow-y-auto max-h-96 scrollbar-thin">
							<Sidebar data={filteredCategories} onSelectCategory={onSelectCategory} />
							{(dataCount > 6 && !isOpen) ?
								<button onClick={openAllCategories} className="bg-[#F1F1F1] hover:bg-white py-2 px-4">
									Показать ещё
								</button>
							: null}
						</div>
					</div>
				</div>
			</div>
		</div>
}

export default DataTab;