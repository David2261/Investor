import { useState, FunctionComponent } from "react";
// Components
import Sidebar from "./Sidebar";
// Styles
import '../../styles/components/Blog/DataTabStyles.css';
// Assets
import homeBlack from '../../assets/icons/menu_black.svg';
import downBlack from '../../assets/icons/down_black.svg';
import upBlack from '../../assets/icons/up_black.svg';
import data from '../../alpha_test_data/blog_data_categories.json';

interface DataTabType {
	onSidebarChange: (isOpen: boolean) => void,
	onFilterChange: (isOpen: boolean) => void
}

// Боковая панель навигации по категориям
const DataTab: FunctionComponent<DataTabType> = ({ onSidebarChange, onFilterChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isFilter, setIsFilter] = useState(false);

	function openModal() {
		setIsOpen(true);
		onSidebarChange(true);
	}
	function closeModal() {
		setIsOpen(false);
		onSidebarChange(false);
	}
	function openFilter() {
		setIsFilter(true);
		onFilterChange(true);
	}
	function closeFilter() {
		setIsFilter(false);
		onFilterChange(false);
	}
	return <>
		<div className="flex justify-between">
			{!isOpen ?
				<button className="data-tab-sidebar-close-btn" onClick={openModal}>
					<img src={homeBlack} />
					Категории
				</button>
				:
				<div className="fixed left-1">
					<div className="bg-[#009DFF] bg-opacity-10 backdrop-blur-sm rounded-md grid p-4">
						<div className="relative items-center mb-4">
							<div className="flex justify-end mb-4">
								<button onClick={closeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
									</svg>
								</button>
							</div>
							<div>
								<input type="text" placeholder="Поиск..." className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
							</div>
						</div>
						<div className="grid gap-4 sticky">
							<Sidebar data={data} />
						</div>
					</div>
				</div>
			}
			{!isFilter ?
			<button className="data-tab-sidebar-right-btn" onClick={openFilter}>
				Сортировка
				<img src={downBlack} />
			</button>
			:
			<div className="relative grid">
				<button className="data-tab-sidebar-right-btn" onClick={closeFilter}>
					Сортировка
					<img src={upBlack} />
				</button>
				<div>
					<div className="fixed inline-block text-gray-700">
					<div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg">
							<div className="rounded-md bg-white shadow-xs">
								<a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
									Популярные
								</a>
								<a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
								По возрастанию
								</a>
								<a href="#" className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
								По убыванию
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	</>
}

export default DataTab;