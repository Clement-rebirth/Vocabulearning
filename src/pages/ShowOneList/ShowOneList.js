import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PopUpContext } from '../../providers/PopUpProvider';
import { SearchContext } from '../../providers/SearchProvider';
import { ListsContext } from '../../providers/ListsProvider';
import { ROUTES } from '../../constants';
import { getMatchingListWithSlug } from '../../services/lists/getMatchingListWithSlug';

import Modal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import List from './List/List';
import WordCard from './WordCard';
import WordForms from './WordForms';
import GoBackHomeArrow from '../../components/GoBackHomeArrow/GoBackHomeArrow';

import './ShowOneList.css';

const ShowOneList = ({ user, history }) => {

  const [showWordForm, setShowWordForm] = useState(false);
  const [wordToShow, setWordToShow] = useState(false);
  const [list, setList] = useState(false);

  const { showPopUp } = useContext(PopUpContext);
  const { searchMode, disableSearchMode, setCurrentList, handleSearch } = useContext(SearchContext);
  let { lists } = useContext(ListsContext);

  let { slug } = useParams();
  const userId = user && user.uid;

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

  // to get the list the user wants to see
  useEffect(() => {
    // if word lists hasn't been loaded
    if (lists === false) return;

    let list = getMatchingListWithSlug(slug, lists);

    if (!list) history.replace(ROUTES.NOT_FOUND);

    setList(list);
    setCurrentList(list);
  }, [history, lists, setCurrentList, slug]);

  useEffect(() => {
    // execute the search on page load if there is something to search
    if (searchMode) handleSearch();
  }, [handleSearch, searchMode]);

  if (!list || !userId || !lists) return <Loading />;

  let words = list && list.words;
  let nbWords = words ? Object.keys(words).length : 0;

  return (
    <>
      <GoBackHomeArrow history={history} disableSearchMode={disableSearchMode} />

      <List
        openWordForm={openWordForm}
        list={list}
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
          listId={list.id}
          userId={userId}
          wordToShow={wordToShow}
          closeModal={handleClose}
        />
      </Modal>

      <Modal isShow={showWordForm} close={handleClose}>
        <WordForms
          showPopUp={showPopUp}
          listId={list.id}
          userId={userId}
          wordToUpdate={wordToShow}
          closeModal={handleClose}
        />
      </Modal>
    </>
  );
}

export default ShowOneList;
