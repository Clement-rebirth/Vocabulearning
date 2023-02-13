import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchContext } from '../../providers/SearchProvider';
import { ListsContext } from '../../providers/ListsProvider';
import { ROUTES } from '../../constants';
import { getMatchingListWithSlug } from '../../utils/lists/getMatchingListWithSlug';

import Modal from '../../components/Modal/Modal';
import Loading from '../../components/Loading/Loading';
import List from './List/List';
import WordCard from './WordCard';
import WordForms from './WordForms';
import GoBackHomeArrow from '../../components/GoBackHomeArrow/GoBackHomeArrow';

import './ShowOneList.css';

const ShowOneList = ({ navigate }) => {

  const [showWordForm, setShowWordForm] = useState(false);
  const [wordToShow, setWordToShow] = useState(false);

  const { searchMode, disableSearchMode, handleSearch } = useContext(SearchContext);
  let { lists, listsLoading, list, setList } = useContext(ListsContext);
  let { slug } = useParams();

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
    setWordToShow(false);
    setShowWordForm(true);
  };

  // to get the list the user wants to see
  useEffect(() => {
    if (listsLoading) return;

    let matchingList = getMatchingListWithSlug(slug, lists);

    if (!matchingList) navigate(ROUTES.NOT_FOUND, { replace: true });

    setList(matchingList);
  }, [navigate, lists, slug, setList, listsLoading]);

  useEffect(() => {
    // execute the search on page load if there is something to search
    if (searchMode) handleSearch();
  }, [handleSearch, searchMode]);

  if (listsLoading || !list) return <Loading />;

  let words = list && list.words;
  let nbWords = words ? Object.keys(words).length : 0;

  return (
    <>
      <GoBackHomeArrow navigate={navigate} disableSearchMode={disableSearchMode} />

      <List
        openWordForm={openWordForm}
        list={list}
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
          wordToShow={wordToShow}
          closeModal={handleClose}
        />
      </Modal>

      <Modal isShow={showWordForm} close={handleClose}>
        <WordForms wordToUpdate={wordToShow} closeModal={handleClose} />
      </Modal>
    </>
  );
}

export default ShowOneList;
