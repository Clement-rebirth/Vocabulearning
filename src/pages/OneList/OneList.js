import React, { useState } from 'react';

import { updateWordList } from '../../services/firebase/wordListMethods';

import Modal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import WordList from './WordList';
import WordCard from './WordCard';
import WordForm from './WordForm';

import './OneList.css';

const ListPage = props => {

  const {
    currentWordListToShow,
    currentWordListData,
    userId,
    history,
    searchMode,
    disableSearchMode,
  } = props;

  const [showWordCard, setShowWordCard] = useState(false);
  const [showWordForm, setShowWordForm] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const [showRightPart, setShowRightPart] = useState(true);
  const [invertWordWithTrad, setInvertWordWithTrad] = useState(false);

  const startLearningMode = () => alert('Coming soon !');

  const toggleListOrder = (currentOrder, wordListId, userId) => {
    let newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    updateWordList({ order: newOrder }, wordListId, userId);
  };

  const toggleShowRightPart = () => setShowRightPart(!showRightPart);
  const toggleInvertWordWithTrad = () => setInvertWordWithTrad(!invertWordWithTrad);

  const handleClose = () => {
    setShowWordCard(false);
    setShowWordForm(false);
  };

  const openWordCard = (word) => {
    setCurrentWord(word);
    setShowWordCard(true);
    setShowWordForm(false);
  };

  const openWordForm = () => {
    disableSearchMode();
    setShowWordForm(true);
    setShowWordCard(false);
  };

  if (currentWordListToShow === false || !userId) {
    return <Loading />;
  }

  let words = currentWordListData && currentWordListData.words;
  let nbWords = words ? Object.keys(words).length : 0;

  return (
    <>
      <WordList
        openWordForm={openWordForm}
        wordList={currentWordListToShow}
        userId={userId}
        searchMode={searchMode}
        history={history}
        openWordCard={openWordCard}
        nbWords={nbWords}
        disableSearchMode={disableSearchMode}
        showRightPart={showRightPart}
        invertWordWithTrad={invertWordWithTrad}
        toggleListOrder={toggleListOrder}
        toggleShowRightPart={toggleShowRightPart}
        toggleInvertWordWithTrad={toggleInvertWordWithTrad}
      />

      <Modal isShow={showWordCard} close={handleClose}>
        <WordCard 
          openWordForm={openWordForm}
          currentWordListId={currentWordListToShow.id}
          userId={userId}
          currentWord={currentWord}
          closeModal={handleClose}
        />
      </Modal>

      <Modal isShow={showWordForm} close={handleClose}>
        <WordForm
          currentWordListId={currentWordListToShow.id}
          userId={userId}
          wordToUpdate={currentWord}
          closeModal={handleClose}
        />
      </Modal>

      <footer className='options-bar'>
        <button 
          className={`invert-word-with-trad ${invertWordWithTrad && 'enable'}`} 
          onClick={toggleInvertWordWithTrad}
        >
          <span className='material-icons-round'>swap_horiz</span>
        </button>

        <button className='add-word' onClick={openWordForm}>
          <span className='material-icons-round'>add</span>
        </button>

        <button 
          className={`hide-right-part ${showRightPart && 'enable'}`} 
          onClick={toggleShowRightPart}
        >
          <span className='material-icons-round'>
            { showRightPart ? 'visibility' : 'visibility_off' }
          </span>
        </button>
      </footer>

      <button id='start-learning-mode' onClick={startLearningMode}>
        <i className='icofont-dumbbell' />
      </button>
    </>
  );
}

export default ListPage;
