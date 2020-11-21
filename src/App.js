import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut } from './firebase/userMethods';
import { UserContext } from './providers/UserProvider';

import WordForm from './components/WordForm/WordForm';
import Modal from './components/Modal/Modal';
import Menu from './components/Menu/Menu';

import { ROUTES } from './constants';
import Manager from './firebase/Manager';

import './App.css';
import './icons-css/icofont.min.css';

const App = () => {

  const [showWordFormModal, setShowWordFormModal] = useState(false);
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
      userWordListsManager.add({
        name: 'Par défaut',
        words: false
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

  const startLearningMode = () => {
    alert("Coming soon");
    // confirmation
    // start learning mode
  }

  const handleSignOut = () => {
    signOut(() => {
      history.replace(ROUTES.LANDING);
    }, error => {
      console.log('logout error : ', error);
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
      
      <div className='word-list'>
        <button onClick={() => setShowWordFormModal(true)}>Ajouter un mot</button>
        <div className='words'>Votre liste ne contient aucun mot.</div>
      </div>
      
      <Modal 
        visible={showWordFormModal} 
        handleClose={() => setShowWordFormModal(false)}
      >
        <WordForm />
      </Modal>

      <button id='start-learning-mode' onClick={startLearningMode}>
        <i className='icofont-dumbbell'></i>
      </button>
    </>
  );
}

export default App;
