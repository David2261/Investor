import { useState } from "react";
// import Sidebar from "./Sidebar";
// Styles
import '../../styles/components/Blog/DataTabStyles.css';
// Assets
import homeBlack from '../../assets/icons/menu_black.svg';
import sortBlack from '../../assets/icons/sort_black.svg';



// Боковая панель навигации по категориям
const DataTab = () => {
	const [isOpen, setIsOpen] = useState(false);
	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}
	return <>
	{!isOpen ?
		<div className="flex justify-between">
			<button className="data-tab-sidebar-close-btn"><img src={homeBlack} /> Категории</button>
			<button className="data-tab-sidebar-right-btn"><img src={sortBlack} />Сортировка</button>
		</div>
	: false}
	</>
}

export default DataTab;