import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserProvider';
import '../utils/firebase/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

export const ListsContext = createContext({
  lists: false
});

const ListsProvider = ({ children }) => {

  // null = user has no list
  // false = loading
  // object = lists
  const [lists, setLists] = useState(false);

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
    });
  }, [user]);

  return (
    <ListsContext.Provider value={{ lists }}>
      { children }
    </ListsContext.Provider>
  );
}

export default ListsProvider;;
