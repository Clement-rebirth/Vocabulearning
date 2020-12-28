import React, { useContext, useState } from 'react';
import { PopUpContext } from '../../providers/PopUpProvider';

import Modal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import WordList from './WordList/WordList';
import WordCard from './WordCard';
import WordForms from './WordForms';
import GoBackHomeArrow from '../../components/GoBackHomeArrow/GoBackHomeArrow';

import './ShowOneList.css';

const ShowOneList = props => {

  const {
    currentListToShow,
    currentListData,
    userId,
    history,
    searchMode,
    disableSearchMode,
  } = props;

  const [showWordForm, setShowWordForm] = useState(false);
  const [wordToShow, setWordToShow] = useState(false);

  const { showPopUp } = useContext(PopUpContext);

  const startLearningMode = () => alert('Coming soon !');

  const handleClose = () => {
    setWordToShow(false);
    setShowWordForm(false);
  };

  const openWordCard = word => {
    setWordToShow(word);
    setShowWordForm(false);
  };

  const openWordForm = () => {
    disableSearchMode();
    setShowWordForm(true);
  };

  if (currentListToShow === false || !userId) {
    return <Loading />;
  }

  let words = currentListData && currentListData.words;
  let nbWords = words ? Object.keys(words).length : 0;

  return (
    <>
      <GoBackHomeArrow history={history} disableSearchMode={disableSearchMode} />

      <WordList
        openWordForm={openWordForm}
        wordList={currentListToShow}
        userId={userId}
        searchMode={searchMode}
        openWordCard={openWordCard}
        nbWords={nbWords}
      />

      <button id='start-learning-mode' onClick={startLearningMode}>
        <i className='icofont-dumbbell' />
      </button>

      <Modal isShow={!!wordToShow} close={handleClose}>
        <WordCard 
          openWordForm={openWordForm}
          currentListId={currentListToShow.id}
          userId={userId}
          wordToShow={wordToShow}
          closeModal={handleClose}
        />
      </Modal>

      <Modal isShow={showWordForm} close={handleClose}>
        <WordForms
          showPopUp={showPopUp}
          currentListId={currentListToShow.id}
          userId={userId}
          wordToUpdate={wordToShow}
          closeModal={handleClose}
        />
      </Modal>
    </>
  );
}

export default ShowOneList;
