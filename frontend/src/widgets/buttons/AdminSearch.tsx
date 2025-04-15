import React, { useState } from 'react';
// Assets
import SearchWhite from '@/assets/icons/search_white.svg';
// Styles
import '@/styles/widgets/buttons/AdminSearch.css';

const AdminSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleClear = () => {
        setSearchTerm('');
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
    };

    return (
        <div className="searchWrapper">
            <input
                type="text"
                placeholder="Search"
                className="searchInput"
                id="searchInput"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button id="X" onClick={handleClear}>
                <svg viewBox="0 0 10 10" width="1em" height="1em" stroke="#848F91" strokeWidth="2">
                    <path d="M1,1 9,9 M9,1 1,9" />
                </svg>
            </button>
            <button id="S" onClick={handleSearch}>
                <img
					className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
					src={SearchWhite}
					alt="Search Icon" />
            </button>
            <div className="searchBorder"></div>
        </div>
    );
};

export default AdminSearch;