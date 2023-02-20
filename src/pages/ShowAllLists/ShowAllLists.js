import { useContext, useEffect, useState } from 'react';
import { ROUTES } from '../../constants';
import { ListsContext } from '../../providers/ListsProvider';
import { SearchContext } from '../../providers/SearchProvider';

import AllLists from './AllLists';
import Loading from '../../components/Loading/Loading';
import AddList from './AddList';

import './ShowAllLists.css';

const ShowAllLists = ({ navigate }) => {

  const [closeCurrentForm, setCloseCurrentForm] = useState(false);

  let { lists, listsLoading, setList } = useContext(ListsContext);
  const { searchMode } = useContext(SearchContext);

  // close the current form if there is one and set the new close functionet the new one
  const setCloseCurrentFormFunc = newCloseFunc => {
    if (closeCurrentForm) closeCurrentForm();
    setCloseCurrentForm(() => newCloseFunc); // we just pass the reference
  };

  const openList = slug => navigate(`${ROUTES.HOME}/${slug}`);

  useEffect(() => setList(null), [setList]);

  if (listsLoading) return <Loading />;

  return (
    <div className='all-lists-page'>
      { !searchMode &&
        <>
          <div className='wrap'>
            <h1>Mes listes</h1>
          </div>

          <AddList setCloseCurrentFormFunc={setCloseCurrentFormFunc} />
        </>
      }

      <AllLists
        lists={lists}
        openList={openList}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
        searchMode={searchMode}
      />
    </div>
  );
}

export default ShowAllLists;
