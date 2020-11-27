import React from 'react';

const SearchBar = props => {
  
  const { 
    showMenu,
    search,
    setSearch,
    handleSearch,
    disableSearchMode
  } = props;

  const handleChange = e => {
    let strToSearch = e.target.value;
    setSearch(strToSearch);
    handleSearch(strToSearch);
  };

  const reset = () => {
    setSearch('');
    disableSearchMode();
  };

  return (
    <div className='search-bar'>
      <button onClick={showMenu} id='open-menu'>Menu</button>

      <input
        name='search'
        type='search'
        placeholder='Chercher un mot'
        value={search}
        onChange={handleChange}
      />

      <button onClick={reset}>clean</button>
    </div>
  );
}

export default SearchBar;
