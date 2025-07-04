import { useState } from 'react';
import SearchWhite from '@/assets/icons/search_white.svg';
import styles from '@/styles/widgets/buttons/AdminSearch.module.css';

const AdminSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);

  const handleClear = () => setSearchTerm('');
  const handleSearch = () => console.log('Searching for:', searchTerm);

  return (
    <div className={styles.searchWrapper}>
      <input
        name="text"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={styles.searchInput}
      />
      <button
        onClick={handleClear}
        style={{
          visibility: searchTerm ? 'visible' : 'hidden',
          pointerEvents: searchTerm ? 'auto' : 'none',
          opacity: searchTerm ? 1 : 0,
        }}
      >
        <svg viewBox="0 0 10 10" width="1em" height="1em" stroke="#848F91" strokeWidth="2">
          <path d="M1,1 9,9 M9,1 1,9" />
        </svg>
      </button>
      <button
        onClick={handleSearch}
        style={{
          visibility: searchTerm ? 'hidden' : 'visible',
          pointerEvents: searchTerm ? 'none' : 'auto',
          opacity: searchTerm ? 0 : 1,
          transform: focused ? 'translateY(-50%) translateX(-10%) scaleX(-1)' : 'translateY(-50%)',
        }}
      >
        <img
          src={SearchWhite}
          alt="Search Icon"
          style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem' }}
        />
      </button>
      <div className={`${styles.searchBorder} ${focused ? styles.active : ''}`} />
    </div>
  );
};

export default AdminSearch;