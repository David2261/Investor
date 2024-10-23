import { useState, FunctionComponent } from "react";
// Assets
import downBlack from '../../assets/icons/down_black.svg';
import popularBlack from '../../assets/icons/popular_black.svg';
import upBlack from '../../assets/icons/up_black.svg';

interface FilterType {
	onFilterChange: (isOpen: boolean) => void
}

const Filter: FunctionComponent<FilterType> = ({ onFilterChange }) => {
	const [isFilter, setIsFilter] = useState(false);

	function openFilter() {
		setIsFilter(true);
		onFilterChange(true);
	}
	function closeFilter() {
		setIsFilter(false);
		onFilterChange(false);
	}

    return !isFilter ?
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
                            <a href="#" className="flex rounded-t-md justify-between px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-[#85BB65] focus:outline-none focus:bg-[#85BB65] transition duration-150 ease-in-out">
                                Популярные
                                <img src={popularBlack} className="rounded-lg" alt="" />
                            </a>
                            <a href="#" className="flex justify-between px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-[#85BB65] focus:outline-none focus:bg-[#85BB65] transition duration-150 ease-in-out">
                                По возрастанию
                                <img src={upBlack} className="rounded-lg" alt="" />
                            </a>
                            <a href="#" className="flex rounded-b-md justify-between px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-[#85BB65] focus:outline-none focus:bg-[#85BB65] transition duration-150 ease-in-out">
                                По убыванию
                                <img src={downBlack} className="rounded-lg" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
}

export default Filter;