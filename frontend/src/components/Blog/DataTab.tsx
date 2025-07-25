import React, { useState, FunctionComponent, Suspense, lazy } from 'react';
import { useSpring, animated } from '@react-spring/web';
// API
import { useAllCategories } from '@/api/useAllCategories.tsx';
// Assets
import homeBlack from '@/assets/icons/menu_black.svg';
import closeBlack from '@/assets/icons/close_black.svg';
import searchBlack from '@/assets/icons/search_black.svg';
// Styles
import styles from '@/styles/components/Blog/DataTab.module.css'

// Lazy-loaded component
const Sidebar = lazy(() => import('./Sidebar'));

interface SideNavbarType {
  isSidebarChange: boolean;
  onSidebarChange: (isOpen: boolean) => void;
  onSelectCategory: (category: string) => void;
}

const DataTab: FunctionComponent<SideNavbarType> = ({
  isSidebarChange,
  onSidebarChange,
  onSelectCategory,
}) => {
  const { data, dataCount, error } = useAllCategories();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = !isOpen && dataCount > 5 ? data.slice(0, 5) : data;
  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Animation for sliding in from the left
  const slideIn = useSpring({
    from: { transform: 'translateX(-100%)', opacity: 0 },
    to: {
      transform: isSidebarChange ? 'translateX(0%)' : 'translateX(-100%)',
      opacity: isSidebarChange ? 1 : 0,
    },
    config: { tension: 200, friction: 30 },
  });

  if (error) {
    return <div className="text-red-500 p-4">Ошибка: {error.message}</div>;
  }

  const openModal = () => onSidebarChange(true);
  const closeModal = () => {
    closeAllCategories();
    onSidebarChange(false);
  };
  const openAllCategories = () => setIsOpen(true);
  const closeAllCategories = () => setIsOpen(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/[<>"'`]/.test(value)) {
      console.warn('Обнаружены недопустимые символы в поиске:', value);
      return;
    }
    setSearchTerm(value);
  };

  return !isSidebarChange ? (
    <button
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      onMouseEnter={openModal}
    >
      <img src={homeBlack} alt="Открыть категории" className="w-5 h-5" />
      Категории
    </button>
  ) : (
    <div className="fixed inset-0 flex z-50">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={closeModal}
      ></div>

      {/* Animated sidebar */}
      <animated.div
        style={slideIn}
        className="relative bg-white w-80 h-full flex flex-col shadow-lg"
      >
        <div className={`flex flex-col w-full h-full p-4 ${styles.backgroundDataTab}`}>
          {/* Header with close button */}
          <div className="flex justify-end mb-4">
            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full">
              <img src={closeBlack} alt="Закрыть" className="w-6 h-6" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <img
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              src={searchBlack}
              alt="Поиск"
            />
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full border-b py-2 pl-10 pr-4 focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Categories list */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin">
            <Suspense fallback={<div className="p-4">Загрузка категорий...</div>}>
              <Sidebar data={filteredCategories as any} onSelectCategory={onSelectCategory} />
            </Suspense>
            {dataCount > 5 && !isOpen && (
              <button
                onClick={openAllCategories}
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-md transition-colors"
              >
                Показать ещё
              </button>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default DataTab;