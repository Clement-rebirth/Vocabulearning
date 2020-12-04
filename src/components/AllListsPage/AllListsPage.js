import React from 'react';

import WordListsInfo from '../WordListsInfo/WordListsInfo';
import Loading from '../Loading/Loading';

import { ROUTES } from '../../constants';

import './AllListsPage.css';

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
    <WordListsInfo
      wordLists={wordListsToShow}
      openWordList={openWordList}
      userId={userId}
      searchMode={searchMode}
      disableSearchMode={disableSearchMode}
    />
  );
}

export default AllListsPage;
