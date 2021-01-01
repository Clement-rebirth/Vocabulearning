import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ListsContext } from './ListsProvider';
import { getMatchingWords } from '../services/lists/getMatchingWords';
import { getListsWithMatchingWords } from '../services/lists/getListsWithMatchingWords';

import SearchBar from '../components/SearchBar/SearchBar';

export const SearchContext = createContext({
  matchingWords: null,
  listsWithMatchingWords: null,
  searchMode: false,
  disableSearchMode: () => {},
  setCurrentList: () => {},
  handleSearch: () => {},
});

const SearchProvider = ({ showMenu, children }) => {

  const [search, setSearch] = useState('');
  const [matchingWords, setMatchingWords] = useState(null);
  const [listsWithMatchingWords, setListsWithMatchingWords] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [currentList, setCurrentList] = useState(null);

  let { lists } = useContext(ListsContext);

  const disableSearchMode = () => setSearchMode(false);

  // if user quit the search (by cleaning, deleting...) the default data are set
  useEffect(() => {
    if (!searchMode) {
      setSearch('');
      setListsWithMatchingWords(null);
      setMatchingWords(null);
    }
  }, [searchMode]);

  const searchWordInOneList = (wordToSearch, list) => {
    let matchingWords = getMatchingWords(wordToSearch, list);
    setMatchingWords(matchingWords);
  };

  const searchWordInAllLists = (wordToSearch, lists) => {
    let matchingLists = getListsWithMatchingWords(wordToSearch, lists);
    setListsWithMatchingWords(matchingLists);
  };

  const handleSearch = useCallback(() => {
    setSearchMode(!!search);
    
    if (currentList) {
      searchWordInOneList(search, currentList);
      return;
    }
    
    searchWordInAllLists(search, lists);
  }, [search, currentList, lists]);

  // execute the search everytime search state update
  useEffect(() => handleSearch(), [search, handleSearch]);

  let providerValue = {
    matchingWords,
    listsWithMatchingWords,
    searchMode,
    disableSearchMode,
    setCurrentList,
    handleSearch
  };

  return (
    <SearchContext.Provider value={providerValue}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        disableSearchMode={disableSearchMode}
        showMenu={showMenu}
      />

      { children }
    </SearchContext.Provider>
  );
}
 
export default SearchProvider;
