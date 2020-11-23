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

const App = () => {

  const [showWordModal, setShowWordModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [wordLists, setWordLists] = useState(false);
  const [userData, setUserData] = useState(false);
  
  let history = useHistory();
  let user = useContext(UserContext);

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

  // fetch user's wordLists and add a listener on it
  useEffect(() => {
    if (!user) return;

    let userWordListsManager = new Manager(`wordLists/${user.uid}`);
    userWordListsManager.getAll(snapshot => {
      setWordLists(snapshot.val());
    });

    return () => userWordListsManager.close();
  }, [user]);

  // fetch user data
  useEffect(() => {
    // if user has been loaded
    if (!user) return;
    
    let userManager = new Manager(`users/${user.uid}`);
    userManager.getAllOnce(snapshot => {
      setUserData(snapshot.val());
    });
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
      lastRepetition: firebase.database.ServerValue.TIMESTAMP,
      lvl: 0
    });
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
              />
            ))
        }
      </div>
      
      { user && 
        <Modal 
          visible={showWordModal} 
          handleClose={() => setShowWordModal(false)}
        >
          <WordForm
            addWord={addWord}
            wordListId={Object.keys(wordLists)[0]}
            userId={user.uid}
          />
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

        <button onClick={() => setShowWordModal(true)}>Ajouter un mot</button>
      </footer>
    </>
  );
}

export default App;
