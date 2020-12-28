import React from 'react';

import ListContainer from './ListContainer';
import NoListsToShow from './NoListsToShow';

const AllLists = props => {

  const {
    lists,
    openList,
    userId,
    searchMode,
    setCloseCurrentFormFunc
  } = props;

  let noLists = !lists && !searchMode;
  let noSearchResult = !lists && searchMode;

  return (
    <div className='word-lists'>
      {lists && Object.keys(lists).map(key => (
        <ListContainer
          key={key}
          allLists={lists}
          list={{...lists[key], id: key}} 
          openList={openList}
          userId={userId}
          setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        />
      ))}

      <NoListsToShow noSearchResult={noSearchResult} noLists={noLists} />
    </div>
  );
}

export default AllLists;
