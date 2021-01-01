import React, { useContext, useEffect, useState } from 'react';
import { ROUTES } from '../../constants';
import { ListsContext } from '../../providers/ListsProvider';
import { SearchContext } from '../../providers/SearchProvider';

import AllLists from './AllLists';
import Loading from '../../components/Loading/Loading';
import AddList from './AddList';

import './ShowAllLists.css';

const ShowAllLists = ({ user, history }) => {
  
  const [closeCurrentForm, setCloseCurrentForm] = useState(false);

  let { lists } = useContext(ListsContext);
  let { searchMode, disableSearchMode, listsWithMatchingWords, setCurrentList } = useContext(SearchContext);
  
  const userId = user && user.uid;

  // close the current form if there is one and set the new one
  const setCloseCurrentFormFunc = newCloseFunc => {
    if (closeCurrentForm) closeCurrentForm();
    setCloseCurrentForm(() => newCloseFunc);
  };

  const openList = slug => history.push(`${ROUTES.HOME}/${slug}`);

  useEffect(() => setCurrentList(null), [setCurrentList]);

  if (!user || !lists) return <Loading />;

  return (
    <div className='all-lists-page'>
      <AddList
        existingLists={lists}
        searchMode={searchMode}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        disableSearchMode={disableSearchMode}
        userId={userId}
      />
      
      <AllLists
        lists={lists}
        listsWithMatchingWords={listsWithMatchingWords}
        openList={openList}
        userId={userId}
        searchMode={searchMode}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
      />
    </div>
  );
}

export default ShowAllLists;
