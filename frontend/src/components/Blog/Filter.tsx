import React, { useState, FunctionComponent } from 'react';
// Assets
import downBlack from '@/assets/icons/down_black.svg';
import popularBlack from '@/assets/icons/popular_black.svg';
import upBlack from '@/assets/icons/up_black.svg';

interface FilterType {
  onFilterChange: (filter: { sortBy: string; order: string }) => void;
}

const Filter: FunctionComponent<FilterType> = ({ onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleFilterChange = (sortBy: string, order: string) => {
    onFilterChange({ sortBy, order });
    setIsFilterOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative">
      <button
        className="data-tab-sidebar-right-btn flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        aria-label="Открыть меню сортировки"
      >
        Сортировка
        <img
          src={isFilterOpen ? upBlack : downBlack}
          alt={isFilterOpen ? 'Скрыть сортировку' : 'Показать сортировку'}
          className="w-5 h-5"
        />
      </button>
      {isFilterOpen && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="rounded-md">
            <div
              onClick={() => handleFilterChange('popularity', 'desc')}
              className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-[#85BB65] focus:bg-[#85BB65] transition-colors duration-150 ease-in-out rounded-t-md"
              role="menuitem"
            >
              Популярные
              <img
                src={popularBlack}
                alt="Сортировка по популярности"
                className="w-5 h-5 rounded-lg"
              />
            </div>
            <div
              onClick={() => handleFilterChange('date', 'asc')}
              className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-[#85BB65] focus:bg-[#85BB65] transition-colors duration-150 ease-in-out"
              role="menuitem"
            >
              По возрастанию даты
              <img
                src={upBlack}
                alt="Сортировка по возрастанию даты"
                className="w-5 h-5 rounded-lg"
              />
            </div>
            <div
              onClick={() => handleFilterChange('date', 'desc')}
              className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-[#85BB65] focus:bg-[#85BB65] transition-colors duration-150 ease-in-out rounded-b-md"
              role="menuitem"
            >
              По убыванию даты
              <img
                src={downBlack}
                alt="Сортировка по убыванию даты"
                className="w-5 h-5 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;