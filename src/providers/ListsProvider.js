import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserProvider';
import '../utils/firebase/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

export const ListsContext = createContext({
  lists: null,
  listsLoading: true,
  list: null,
  setList: () => {},
});

const ListsProvider = ({ children }) => {
  const [lists, setLists] = useState(null);
  const [listsLoading, setListsLoading] = useState(true);
  const [list, setList] = useState(null);

  let { user } = useContext(UserContext);

  useEffect(() => {
    // if user hasn't been loaded
    if (!user) return;

    const db = getDatabase();
    const userListsRef = ref(db, `wordLists/${user.uid}`);

    // fetch user's wordLists and add a listener on it
    return onValue(userListsRef, snapshot => {
      let data = snapshot.val();
      setLists(data);
      setListsLoading(false);
    });
  }, [user]);

  return (
    <ListsContext.Provider value={{ lists, listsLoading, list, setList }}>
      { children }
    </ListsContext.Provider>
  );
}

export default ListsProvider;;
