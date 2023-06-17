import { useRef } from 'react';

import { ClearBtn } from './ClearBtn';
import { MenuButton } from '../MenuButton/MenuButton';

import './SearchBar.css';

interface SearchBarProps {
  openMenu: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  disableSearchMode: () => void;
  placeholderText: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const {
    openMenu,
    search,
    setSearch,
    disableSearchMode,
    placeholderText,
  } = props;

  const searchInput = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const wordToSearch = e.target.value;
    setSearch(wordToSearch);
  };

  const reset = () => {
    setSearch('');
    disableSearchMode();
  };

  const quitSearching = () => {
    if (!searchInput.current) return;
    reset();
    searchInput.current.blur();
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') quitSearching();
  };

  return (
    <div className='search-bar-container'>
      <div className='search-bar'>
        <MenuButton openMenu={openMenu} />

        <span id='search-icon' className='material-symbols-rounded'>search</span>

        <input
          name='search'
          type='text'
          autoComplete='off'
          placeholder={placeholderText}
          aria-label={placeholderText}
          value={search}
          onChange={handleChange}
          onKeyDown={handleKeydown}
          ref={searchInput}
        />

        { search && <ClearBtn reset={reset} /> }
      </div>
    </div>
  );
};
