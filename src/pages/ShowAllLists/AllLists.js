import reverseObject from '../../utils/reverseObjectWithKey';
import ListContainer from './ListContainer';
import NoListsToShow from './NoListsToShow';

const AllLists = props => {

  const {
    lists,
    listsWithMatchingWords,
    openList,
    searchMode,
    setCloseCurrentFormFunc
  } = props;

  let noLists = !lists && !searchMode;
  let noSearchResult = !listsWithMatchingWords && searchMode;

  let listsToShow = searchMode ? listsWithMatchingWords : lists;

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

      <NoListsToShow noSearchResult={noSearchResult} noLists={noLists} />
    </div>
  );
}

export default AllLists;
