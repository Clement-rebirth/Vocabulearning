import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { signOut } from './services/firebase/authMethods';
import { UserContext } from './providers/UserProvider';
import Manager from './services/firebase/Manager';
import { addWordList } from './services/firebase/wordListMethods';

import { Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import SearchBar from './components/SearchBar/SearchBar';
import AllLists from './pages/AllLists/AllLists';
import OneList from './pages/OneList/OneList';
import Loading from './components/Loading/Loading';

import { ROUTES } from './constants';
import { strContains } from './services/strContains';

import './App.css';
import './assets/icons-css/icofont.min.css';

const App = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  const [wordListsData, setWordListsData] = useState(false);
  const [wordListsToShow, setWordListsToShow] = useState(false);
  const [userData, setUserData] = useState(false);
  const [currentWordListData, setCurrentWordListData] = useState(false);
  const [currentWordListToShow, setCurrentWordListToShow] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [search, setSearch] = useState('');
  const [executeSearch, setExecuteSearch] = useState(false);
  
  let history = useHistory();
  let { user, setUser } = useContext(UserContext);
  let { slug } = useParams();
  let location = useLocation();
  let redirectAfterAuth = location.state && location.state.redirectAfterAuth;

  // to get the list the user wants to see
  const defineCurrentListFromSlug = useCallback(() => {
    // if word lists hasn't been loaded
    if (!wordListsData) return;

    if (!slug) {
      setCurrentWordListData(false);
      return;
    }

    let currentWordListKey = Object
      .keys(wordListsData)
      .filter(key => wordListsData[key].slug === slug)[0];

    // no match : the list doesn't exist
    if (!currentWordListKey) history.replace(ROUTES.HOME);

    let currentWordList = {
      ...wordListsData[currentWordListKey],
      id: currentWordListKey
    };

    setCurrentWordListData(currentWordList);
    setCurrentWordListToShow(currentWordList);
    setExecuteSearch(true);
  }, [wordListsData, slug, history]);

  const handleSignOut = () => {
    signOut(() => {
      setUser(false);
      history.replace(ROUTES.LANDING);
    }, error => {
      console.log('logout error : ', error);
    });
  };

  // returns the words whose word or translation contain the strToSearch string
  const getMatchingWords = useCallback((strToSearch, wordList) => {
    if (!wordList || !wordList.words) return null;

    let matchingWords = {};

    Object
      .keys(wordList.words)
      .filter(wordKey => {
        let wordObj = wordList.words[wordKey];
        let wordContainsSearch = strContains(wordObj.word, strToSearch);
        let translationContainsSearch = strContains(wordObj.translation, strToSearch);

        return wordContainsSearch || translationContainsSearch;
      })
      .forEach(wordKey => matchingWords[wordKey] = wordList.words[wordKey]);

    if (Object.keys(matchingWords).length === 0) matchingWords = null;
    return matchingWords;
  }, []);

  // returns the lists whose words or translations contain the strToSearch string
  const getMatchingLists = useCallback((strToSearch, wordLists) => {
    if (!wordLists) return null;

    let matchingLists = {};

    Object
      .keys(wordLists)
      .filter(listKey => {
        let matchingWords = getMatchingWords(strToSearch, wordLists[listKey]);
        return matchingWords !== null;
      })
      .forEach(listKey => matchingLists[listKey] = wordLists[listKey]);

    if (Object.keys(matchingLists).length === 0) matchingLists = null;
    return matchingLists;
  }, [getMatchingWords]);

  const handleSearch = useCallback(strToSearch => {
    setSearchMode(!!strToSearch);

    // show the matching words
    if (currentWordListData) {
      let matchingWords = getMatchingWords(strToSearch, currentWordListData);
      setCurrentWordListToShow({
        ...currentWordListData,
        words: matchingWords
      });
      return;
    }
    
    // show the matching lists
    if (wordListsToShow !== false) {
      let matchingLists = getMatchingLists(strToSearch, wordListsData);
      setWordListsToShow(matchingLists);
    }
  }, [currentWordListData, getMatchingLists, getMatchingWords, wordListsData, wordListsToShow]);

  // if user quit the search (by cleaning, deleting...) the default data are set
  useEffect(() => {
    if (!searchMode) {
      setSearch('');
      setWordListsToShow(wordListsData);
      setCurrentWordListToShow(currentWordListData);
    }
  }, [searchMode, wordListsData, currentWordListData]);

  useEffect(() => {
    // if the page to show a list is shown
    // execute only once the search in case there is something to search
    if (executeSearch && currentWordListData && currentWordListToShow) {
      handleSearch(search);
      setExecuteSearch(false);
    }
  }, [currentWordListData, currentWordListToShow, executeSearch, search, handleSearch]);

  useEffect(() => {
    defineCurrentListFromSlug();
  }, [defineCurrentListFromSlug]);

  useEffect(() => {
    if (!user) return;

    // not the first time the user log in
    if (userData !== null) return;

    // create default wordList
    addWordList({ name: 'Ma liste' }, user.uid);

    // create default user
    let userManager = new Manager(`users/${user.uid}`);
    userManager.set(true, () => setUserData(true));
  }, [userData, user]);

  useEffect(() => {
    // if user hasn't been loaded
    if (!user) return;

    // fetch user data
    let userManager = new Manager(`users/${user.uid}`);
    userManager.getAllOnce(snapshot => {
      setUserData(snapshot.val());
    });
    
    // fetch user's wordLists and add a listener on it
    let userWordListsManager = new Manager(`wordLists/${user.uid}`);
    userWordListsManager.getAll(snapshot => {
      let data = snapshot.val();
      setWordListsData(data);
      setWordListsToShow(data);
    });

    return () => userWordListsManager.close();
  }, [user]);

  if (user === false && !redirectAfterAuth) return <Redirect to={ROUTES.LANDING} />;
  
  if (user === null || wordListsToShow === false) return <Loading />;

  return (
    <div className='app'>
      <SearchBar
        handleSearch={handleSearch}
        search={search}
        setSearch={setSearch}
        disableSearchMode={() => setSearchMode(false)}
        showMenu={() => setShowMenu(true)} 
      />

      <Menu 
        isShow={showMenu}
        handleClose={() => setShowMenu(false)}
        handleSignOut={handleSignOut}
      />

      <Route exact path={ROUTES.HOME}>
        <AllLists 
          wordListsToShow={wordListsToShow}
          history={history}
          searchMode={searchMode}
          userId={user.uid}
          disableSearchMode={() => setSearchMode(false)}
        />
      </Route>

      <Route exact path={ROUTES.DISPLAY_ONE_LIST}>
        <OneList
          currentWordListToShow={currentWordListToShow}
          currentWordListData={currentWordListData}
          userId={user.uid}
          history={history}
          searchMode={searchMode}
          disableSearchMode={() => setSearchMode(false)}
        />
      </Route>
    </div>
  );
}

export default App;
