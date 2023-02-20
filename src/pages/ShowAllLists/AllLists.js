import { useContext } from 'react';
import { SearchContext } from '../../providers/SearchProvider';
import reverseObject from '../../utils/reverseObjectWithKey';
import ListContainer from './ListContainer';
import NoListsToShow from './NoListsToShow';

const AllLists = ({ lists, openList, setCloseCurrentFormFunc, searchMode }) => {
  const { matchingLists, search } = useContext(SearchContext);

  const noLists = !lists && !searchMode;
  const noSearchResult = !matchingLists && searchMode;

  let listsToShow = searchMode ? matchingLists : lists;

  // reverse if there are lists to show
  if (listsToShow) listsToShow = reverseObject(listsToShow);

  return (
    <div className='lists'>
      {listsToShow && Object.keys(listsToShow).map(key => (
        <ListContainer
          key={key}
          list={{...listsToShow[key], id: key}}
          openList={openList}
          setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        />
      ))}

      <NoListsToShow noSearchResult={noSearchResult} noLists={noLists} search={search} />
    </div>
  );
}

export default AllLists;
