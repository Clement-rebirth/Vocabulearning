import React from 'react';

import WordListsContainer from './WordListsContainer';
import Loading from '../../components/Loading/Loading';

import { ROUTES } from '../../constants';

import './AllLists.css';

const AllListsPage = props => {

  const {
    wordListsToShow,
    userId,
    searchMode,
    history,
    disableSearchMode
  } = props;

  const openWordList = slug => history.push(`${ROUTES.HOME}/${slug}`);

  if (wordListsToShow === false || !userId) {
    return <Loading />;
  }

  return (
    <WordListsContainer
      wordLists={wordListsToShow}
      openWordList={openWordList}
      userId={userId}
      searchMode={searchMode}
      disableSearchMode={disableSearchMode}
    />
  );
}

export default AllListsPage;
