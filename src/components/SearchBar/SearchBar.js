import { useRef } from 'react';

import ClearBtn from './ClearBtn';

import './SearchBar.css';

const SearchBar = props => {

  const {
    showMenu,
    search,
    setSearch,
    disableSearchMode
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
        <button onClick={showMenu} id='open-menu' aria-label='ouvrir le menu'>
          <span className='material-icons-round'>menu</span>
        </button>

        <span id='search-icon' className='material-icons-round'>search</span>

        <input
          name='search'
          type='text'
          autoComplete='off'
          placeholder='Chercher un mot'
          aria-label='Chercher un mot'
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
