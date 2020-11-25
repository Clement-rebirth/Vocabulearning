import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { signOut } from './firebase/userMethods';
import { UserContext } from './providers/UserProvider';
import Manager from './firebase/Manager';
import { addMultipleWords, addWord, deleteWord, updateWord } from './firebase/WordMethods';
import { slugify } from './utils/utils';

import { Route } from 'react-router-dom';
import WordForm from './components/WordForm/WordForm';
import Modal from './components/Modal/Modal';
import Menu from './components/Menu/Menu';
import WordList from './components/WordList/WordList';
import WordCard from './components/WordCard/WordCard';
import SearchBar from './components/SearchBar/SearchBar';
import WordListsInfo from './components/WordListsInfo/WordListsInfo';

import { ROUTES } from './constants';

import './App.css';
import './icons-css/icofont.min.css';
import Loading from './components/Loading/Loading';

const App = () => {

  const [showWordCard, setShowWordCard] = useState(false);
  const [showWordForm, setShowWordForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [wordLists, setWordLists] = useState(false);
  const [userData, setUserData] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentWordList, setCurrentWordList] = useState(null);
  
  let history = useHistory();
  let user = useContext(UserContext);
  let { slug } = useParams();

  // to get the list the user wants to see
  useEffect(() => {
    // if slug is missing or word lists hasn't been loaded
    if (!slug || !wordLists) return;
    
    let currentWordListKey = Object
      .keys(wordLists)
      .filter(key => wordLists[key].slug === slug)[0];

    // no match : the list doesn't exist
    if (!currentWordListKey) history.replace(ROUTES.HOME);

    setCurrentWordList({
      ...wordLists[currentWordListKey],
      id: currentWordListKey
    });
  }, [wordLists, slug, history]);

  useEffect(() => {
    if (!user) return;

    // first time the user log in
    if (userData === null) {
      // create default wordList
      let userWordListsManager = new Manager(`wordLists/${user.uid}`);
      let defaultWordListName = 'Ma liste';
      userWordListsManager.add({
        name: defaultWordListName,
        slug: slugify(defaultWordListName),
        words: false, 
      });

      // create user
      let userManager = new Manager(`users/${user.uid}`);
      userManager.set(true, () => setUserData(true));
    }
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
      setWordLists(snapshot.val());
    });

    return () => userWordListsManager.close();
  }, [user]);

  const startLearningMode = () => alert('Coming soon !');

  const handleSignOut = () => {
    signOut(() => {
      history.replace(ROUTES.LANDING);
    }, error => {
      console.log('logout error : ', error);
    });
  };

  const handleClose = () => {
    setShowWordCard(false);
    setShowWordForm(false);
    setCurrentWord(null);
  };

  const openWordCard = (word) => {
    setCurrentWord(word);
    setShowWordCard(true);
    setShowWordForm(false);
  };

  const openWordForm = () => {
    setShowWordForm(true);
    setShowWordCard(false);
  };

  const openWordList = slug => history.push(`${ROUTES.HOME}/${slug}`);

  const onSearch = search => {};

  return (
    <>
      <SearchBar onSearch={onSearch} showMenu={() => setShowMenu(true)} />

      <Menu 
        isShow={showMenu}
        handleClose={() => setShowMenu(false)}
        handleSignOut={handleSignOut}
      />

      <Route exact path={ROUTES.HOME}>
        { wordLists
          ? <WordListsInfo wordLists={wordLists} openWordList={openWordList} />
          : <Loading />
        }
      </Route>

      <Route exact path={ROUTES.DISPLAY_ONE_LIST}>
        { currentWordList 
          ? <WordList {...currentWordList} openWordCard={openWordCard} />
          : <Loading />
        }

        { user && 
          <Modal 
            visible={showWordCard || showWordForm} 
            handleClose={handleClose}
          >
            { showWordForm &&
              <WordForm
                addWord={addWord}
                updateWord={updateWord}
                currentWordListId={currentWordList.id}
                userId={user.uid}
                wordToUpdate={currentWord}
                closeModal={handleClose}
                addMultipleWords={addMultipleWords}
              />
            }
            { showWordCard &&
              <WordCard 
                openWordForm={openWordForm}
                deleteWord={deleteWord}
                currentWordListId={currentWordList.id}
                userId={user.uid}
                currentWord={currentWord}
                closeModal={handleClose}
              />
            }
          </Modal>
        }

        <button id='start-learning-mode' onClick={startLearningMode}>
          <i className='icofont-dumbbell' />
        </button>

        <footer>
          <button onClick={openWordForm}>Ajouter un mot</button>
        </footer>
      </Route>
    </>
  );
}

export default App;
