import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from './firebase/userMethods';
import { UserContext } from './providers/UserProvider';
import Manager from './firebase/Manager';
import firebase from './firebase/firebase';
import { slugify } from './utils/utils';

import WordForm from './components/WordForm/WordForm';
import Modal from './components/Modal/Modal';
import Menu from './components/Menu/Menu';
import WordList from './components/WordList/WordList';

import { ROUTES } from './constants';

import './App.css';
import './icons-css/icofont.min.css';
import WordCard from './components/WordCard/WordCard';

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

  useEffect(() => {
    let wordListsIds = Object.keys(wordLists);

    // if the user has at least one word list
    if (wordListsIds.length > 0) setCurrentWordList({
      ...wordLists[wordListsIds[0]],
      id: wordListsIds[0]
    });
  }, [wordLists]);

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

  const addWord = (word, wordListId, userId) => {
    let wordsManager = new Manager(`wordLists/${userId}/${wordListId}/words`);
    wordsManager.add({
      word: word.word,
      translation: word.translation,
      lastRepetition: false,
      lvl: 0,
      addedDate: firebase.database.ServerValue.TIMESTAMP
    });
  };
  
  const addMultipleWords = (words, wordListId, userId, onComplete = () => {}) => {
    let wordsManager = new Manager(`wordLists/${userId}/${wordListId}/words`);

    words = words.map(word => ({
      ...word,
      lastRepetition: false,
      lvl: 0,
      addedDate: firebase.database.ServerValue.TIMESTAMP
    }));

    wordsManager.multipleAdd(words, onComplete);
  };

  const updateWord = (newWord, wordListId, userId, wordId) => {
    let wordManager = new Manager(`wordLists/${userId}/${wordListId}/words/${wordId}`);
    wordManager.update({
      word: newWord.word,
      translation: newWord.translation
    });
  };

  const deleteWord = (wordListId, userId, wordId, onComplete = () => {}) => {
    let wordManager = new Manager(`wordLists/${userId}/${wordListId}/words/${wordId}`);
    wordManager.delete(onComplete);
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

  return (
    <>
      <header>
        <button onClick={() => setShowMenu(true)} id='open-menu'>Menu</button>
        <h1>VocabuLearning</h1>
      </header>

      <Menu 
        isShow={showMenu} 
        handleClose={() => setShowMenu(false)}
        handleSignOut={handleSignOut} 
      />
      
      <div className='word-lists'>
        { wordLists &&
          Object
            .keys(wordLists)
            .map(key => (
              <WordList
                key={key} 
                id={key}
                name={wordLists[key].name}
                words={wordLists[key].words}
                openWordCard={openWordCard}
              />
            ))
        }
      </div>
      
      { user && 
        <Modal 
          visible={showWordCard || showWordForm} 
          handleClose={handleClose}
        >
          { showWordForm &&
            <WordForm
              addWord={addWord}
              updateWord={updateWord}
              wordListId={currentWordList.id}
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
              wordListId={currentWordList.id}
              userId={user.uid}
              currentWord={currentWord}
              closeModal={handleClose}
            />
          }
        </Modal>
      }

      <footer>
        <nav>
          <ul>
            <li>Home</li>
            <li onClick={startLearningMode}>
              Learn
              {/* <i className='icofont-dumbbell' /> */}
            </li>
          </ul>
        </nav>

        <button onClick={openWordForm}>Ajouter un mot</button>
      </footer>
    </>
  );
}

export default App;
