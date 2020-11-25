import React, { useState } from 'react';

const SearchBar = ({ showMenu, onSearch }) => {
  
  const [search, setSearch] = useState('');

  const handleChange = e => {
    let searchVal = e.target.value;
    setSearch(searchVal);
    onSearch(searchVal);
  }

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

      <button onClick={() => setSearch('')}>clean</button>
    </div>
  );
}

export default SearchBar;
