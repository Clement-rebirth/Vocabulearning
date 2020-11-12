import React, { useState } from 'react';

import AddWord from './components/AddWord/AddWord';
import Modal from './components/Modal/Modal';
import Menu from './components/Menu/Menu';

import './App.css';
import './icons-css/icofont.min.css';

const App = () => {

  const [showWordFormModal, setShowWordFormModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const startLearningMode = () => {
    alert("Coming soon");
    // confirmation
    // start learning mode
  }

  return (
    <>
      <header>
        <button onClick={() => setShowMenu(true)} id='open-menu'>Menu</button>
        <h1>VocabuLearning</h1>
      </header>

      <Menu isShow={showMenu} handleClose={() => setShowMenu(false)} />
      
      <div className='word-list'>
        <button onClick={() => setShowWordFormModal(true)}>Ajouter un mot</button>
        <div className='words'>Votre liste ne contient aucun mot.</div>
      </div>
      
      <Modal 
        visible={showWordFormModal} 
        handleClose={() => setShowWordFormModal(false)}
      >
        <AddWord />
      </Modal>

      <button id='start-learning-mode' onClick={startLearningMode}>
        <i className='icofont-dumbbell'></i>
      </button>
    </>
  );
}

export default App;
