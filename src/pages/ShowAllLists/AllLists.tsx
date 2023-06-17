import { useSearch } from '../../contexts/SearchContext';
import { Lists } from '../../types/list';
import { reverseObject } from '../../utils/reverseObject';

import ListContainer from './ListContainer';
import NoListsToShow from './NoListsToShow';

interface AllListsProps {
  lists: Lists | null;
  openList: (slug: string) => void;
  setCloseCurrentFormFunc: (newCloseFunc: (() => void) | false) => void;
  searchMode: boolean;
}

const AllLists = ({ lists, openList, setCloseCurrentFormFunc, searchMode }: AllListsProps) => {
  const { matchingLists, search } = useSearch();

  const noLists = !lists && !searchMode;
  const noSearchResult = !matchingLists && searchMode;

  let listsToShow = searchMode ? matchingLists : lists;

  // reverse if there are lists to show
  if (listsToShow) listsToShow = reverseObject(listsToShow);

  return (
    <div className='lists'>
      {listsToShow && Object.keys(listsToShow).map(key => {
        const list = listsToShow && listsToShow[key];
        if (!list) return null;
        return (
          <ListContainer
            key={key}
            list={{...list, id: key}}
            openList={openList}
            setCloseCurrentFormFunc={setCloseCurrentFormFunc}
          />
        );
      })}

      <NoListsToShow noSearchResult={noSearchResult} noLists={noLists} search={search} />
    </div>
  );
}

export default AllLists;
