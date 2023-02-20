import { useRef } from 'react';

import ClearBtn from './ClearBtn';

import './SearchBar.css';
import MenuButton from '../MenuButton/MenuButton';

const SearchBar = props => {

  const {
    openMenu,
    search,
    setSearch,
    disableSearchMode,
    placeholderText,
  } = props;

  const searchInput = useRef(null);

  const handleChange = e => {
    let wordToSearch = e.target.value;
    setSearch(wordToSearch);
  };

  const reset = () => {
    setSearch('');
    disableSearchMode();
  };

  const quitSearching = () => {
    reset();
    searchInput.current.blur();
  };

  const handleKeydown = e => {
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
}

export default SearchBar;
