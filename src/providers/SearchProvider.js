import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ListsContext } from './ListsProvider';
import { getMatchingWords } from '../utils/lists/getMatchingWords';
import getMatchingLists from '../utils/lists/getMatchingLists';

import SearchBar from '../components/SearchBar/SearchBar';

export const SearchContext = createContext({
  matchingWords: null,
  searchMode: false,
  disableSearchMode: () => {},
  handleSearch: () => {},
});

const SearchProvider = ({ openMenu, children }) => {

  const [search, setSearch] = useState('');
  const [matchingWords, setMatchingWords] = useState(null);
  const [matchingLists, setMatchingLists] = useState(null);
  const [searchMode, setSearchMode] = useState(false);

  let { lists, list } = useContext(ListsContext);
  const location = useLocation();
  const placeholderText = list ? 'Chercher un mot' : 'Chercher une liste';

  const disableSearchMode = () => setSearchMode(false);

  const setDefaultValues = () => {
    setSearch('');
    setMatchingWords(null);
    setMatchingLists(null);
  };

  // if user quit the search (by cleaning, deleting...) the default data are set
  useEffect(() => {
    if (!searchMode) setDefaultValues();
  }, [searchMode]);

  // set default values when location changes
  useEffect(() => {
    setDefaultValues();
  }, [location]);

  const searchWordInOneList = (wordToSearch, list) => {
    let searchResults = getMatchingWords(wordToSearch, list);
    setMatchingWords(searchResults);
  };

  const handleSearch = useCallback(() => {
    setSearchMode(!!search);

    // page with words
    if (list) {
      searchWordInOneList(search, list);
      return;
    }

    // page with lists
    const searchResults = getMatchingLists(search, lists);
    setMatchingLists(searchResults);
  }, [search, list, lists]);

  // execute the search everytime search state update
  useEffect(() => handleSearch(), [search, handleSearch]);

  let providerValue = {
    matchingWords,
    matchingLists,
    searchMode,
    disableSearchMode,
    handleSearch,
    search,
  };

  return (
    <SearchContext.Provider value={providerValue}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        disableSearchMode={disableSearchMode}
        openMenu={openMenu}
        placeholderText={placeholderText}
      />

      { children }
    </SearchContext.Provider>
  );
}

export default SearchProvider;
