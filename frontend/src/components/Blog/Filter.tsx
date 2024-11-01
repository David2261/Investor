import { useState, FunctionComponent } from "react";
// Assets
import downBlack from '../../assets/icons/down_black.svg';
import popularBlack from '../../assets/icons/popular_black.svg';
import upBlack from '../../assets/icons/up_black.svg';

interface FilterType {
	onFilterChange: (filter: { sortBy: string, order: string }) => void;
}

const Filter: FunctionComponent<FilterType> = ({ onFilterChange }) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const handleFilterChange = (sortBy: string, order: string) => {
		onFilterChange({ sortBy, order });
		setIsFilterOpen(false);
	};

	return (
		<div>
			<button className="data-tab-sidebar-right-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
				Сортировка
				<img src={isFilterOpen ? upBlack : downBlack} />
			</button>
			{isFilterOpen && (
				<div className="absolute mt-2 w-auto md:w-56 rounded-md shadow-lg">
					<div className="rounded-md bg-white shadow-xs">
						<div
							onClick={() => handleFilterChange('popularity', 'desc')}
							className="flex cursor-pointer rounded-t-md justify-between px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-[#85BB65] focus:outline-none focus:bg-[#85BB65] transition duration-150 ease-in-out">
							Популярные
							<img src={popularBlack} className="rounded-lg" alt="" />
						</div>
						<div
							onClick={() => handleFilterChange('date', 'asc')}
							className="flex cursor-pointer justify-between px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-[#85BB65] focus:outline-none focus:bg-[#85BB65] transition duration-150 ease-in-out">
							По возрастанию даты
							<img src={upBlack} className="rounded-lg" alt="" />
						</div>
						<div
							onClick={() => handleFilterChange('date', 'desc')}
							className="flex cursor-pointer rounded-b-md justify-between px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-[#85BB65] focus:outline-none focus:bg-[#85BB65] transition duration-150 ease-in-out">
							По убыванию даты
							<img src={downBlack} className="rounded-lg" alt="" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Filter;