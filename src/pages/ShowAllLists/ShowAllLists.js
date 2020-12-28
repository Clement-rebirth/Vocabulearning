import React, { useState } from 'react';
import { ROUTES } from '../../constants';

import AllLists from './AllLists';
import Loading from '../../components/Loading/Loading';
import AddList from './AddList';

import './ShowAllLists.css';

const ShowAllLists = props => {

  const {
    listsToShow,
    userId,
    searchMode,
    history,
    disableSearchMode
  } = props;
  
  const [closeCurrentForm, setCloseCurrentForm] = useState(false);

  // close the current form if there is one and set the new one
  const setCloseCurrentFormFunc = newCloseFunc => {
    if (closeCurrentForm) closeCurrentForm();
    setCloseCurrentForm(() => newCloseFunc);
  };

  const openList = slug => history.push(`${ROUTES.HOME}/${slug}`);

  if (listsToShow === false || !userId) {
    return <Loading />;
  }

  return (
    <div className='all-lists-page'>
      <AddList
        existingLists={listsToShow}
        searchMode={searchMode}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        disableSearchMode={disableSearchMode}
        userId={userId}
      />
      
      <AllLists
        lists={listsToShow}
        openList={openList}
        userId={userId}
        searchMode={searchMode}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
      />
    </div>
  );
}

export default ShowAllLists;
