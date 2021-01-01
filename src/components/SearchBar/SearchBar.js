import React from 'react';

import './SearchBar.css';

const SearchBar = props => {
  
  const { 
    showMenu,
    search,
    setSearch,
    disableSearchMode
  } = props;

  const handleChange = e => {
    let wordToSearch = e.target.value;
    setSearch(wordToSearch);
  };

  const reset = () => {
    setSearch('');
    disableSearchMode();
  };

  let clearBtn = (
    <button 
      className='clear-search' 
      aria-label='effacer la recherche' 
      onClick={reset}
    >
      <span className='material-icons-round'>clear</span>
    </button>
  );

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
        />

        { search && clearBtn }
      </div>
    </div>
  );
}

export default SearchBar;
