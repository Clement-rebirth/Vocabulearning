import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMatchingWords } from '../utils/lists/getMatchingWords';
import { getMatchingLists } from '../utils/lists/getMatchingLists';
import { useLists } from './ListsContext';
import { List, Lists } from '../types/list';
import { Words } from '../types/word';

import { SearchBar } from '../components/SearchBar/SearchBar';

interface SearchContextValues {
  matchingWords: Words | null;
  searchMode: boolean;
  disableSearchMode: () => void;
  handleSearch: () => void;
  matchingLists: Lists | null;
  search: string;
}

const SearchContext = createContext<SearchContextValues | null>(null);

interface SearchProviderProps {
  openMenu: () => void;
  children: React.ReactNode;
}

export const SearchProvider = ({ openMenu, children }: SearchProviderProps) => {
  const [search, setSearch] = useState('');
  const [matchingWords, setMatchingWords] = useState<Words | null>(null);
  const [matchingLists, setMatchingLists] = useState<Lists | null>(null);
  const [searchMode, setSearchMode] = useState(false);

  const { lists, list } = useLists();
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

  const searchWordInOneList = (wordToSearch: string, wordList: List) => {
    const searchResults = getMatchingWords(wordToSearch, wordList);
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

  const providerValue: SearchContextValues = {
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
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};
