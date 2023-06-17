import { useEffect, useState } from 'react';
import { NavigateFunction, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { getMatchingListWithSlug } from '../../utils/lists/getMatchingListWithSlug';
import { useSearch } from '../../contexts/SearchContext';
import { useLists } from '../../contexts/ListsContext';
import { WordWithId } from '../../types/word';

import { Modal } from '../../components/Modal/Modal';
import { Loading } from '../../components/Loading/Loading';
import { List } from './List/List';
import { WordCard } from './WordCard';
import { WordForms } from './WordForms';
import { GoBackHomeArrow } from '../../components/GoBackHomeArrow/GoBackHomeArrow';

import './ShowOneList.css';

export const ShowOneList = ({ navigate }: { navigate: NavigateFunction }) => {
  const [showWordForm, setShowWordForm] = useState(false);
  const [showWordCard, setShowWordCard] = useState(false);
  const [wordToShow, setWordToShow] = useState<WordWithId | null>(null);

  const { disableSearchMode } = useSearch();
  const { lists, listsLoading, list, setList } = useLists();
  const { slug } = useParams();

  const startLearningMode = () => alert('Coming soon !');

  const handleClose = () => {
    setWordToShow(null);
    setShowWordForm(false);
    setShowWordCard(false);
  };

  const openWordCard = (word: WordWithId) => {
    setWordToShow(word);
    setShowWordForm(false);
    setShowWordCard(true);
  };

  const openWordForm = () => {
    disableSearchMode();
    setShowWordForm(true);
    setShowWordCard(false);
  };

  // to get the list the user wants to see
  useEffect(() => {
    if (listsLoading || !slug || !lists) return;

    const matchingList = getMatchingListWithSlug(slug, lists);

    if (!matchingList) navigate(ROUTES.NOT_FOUND, { replace: true });

    setList(matchingList);
  }, [navigate, lists, slug, setList, listsLoading]);

  if (listsLoading || !list) return <Loading />;

  const words = list && list.words;
  const nbWords = words ? Object.keys(words).length : 0;

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

      <Modal isShow={showWordCard} close={handleClose}>
        {wordToShow && (
          <WordCard
            openWordForm={openWordForm}
            listId={list.id}
            wordToShow={wordToShow}
            closeModal={handleClose}
          />
        )}
      </Modal>

      <Modal isShow={showWordForm} close={handleClose}>
        <WordForms wordToUpdate={wordToShow} closeModal={handleClose} />
      </Modal>
    </>
  );
};
