import React, { useState } from 'react';
import AddWord from './components/AddWord/AddWord';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';

import './App.css';
import './icons-css/icofont.min.css';

const App = () => {

  const [wordFormModalVisible, setWordFormModalVisible] = useState(false);

  const showAddWordModal = () => setWordFormModalVisible(true);
  const hideAddWordModal = () => setWordFormModalVisible(false);
  
  const startLearningMode = () => {
    alert("Coming soon");
    // confirmation
    // start learning mode
  }

  return (
    <>
      <Header />
      
      <div className='word-list'>
        <button onClick={showAddWordModal}>Ajouter un mot</button>
        <div className='words'>Votre liste ne contient aucun mot.</div>
      </div>
      
      <Modal visible={wordFormModalVisible} handleClose={hideAddWordModal}>
        <AddWord />
      </Modal>

      <button id='start-learning-mode' onClick={startLearningMode}>
        <i className='icofont-dumbbell'></i>
      </button>
    </>
  );
}

export default App;
