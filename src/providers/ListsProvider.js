import { createContext, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserProvider';
import firebase from '../utils/firebase/firebase';

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

    // fetch user's wordLists and add a listener on it
    const userListsRef = firebase.database().ref(`wordLists/${user.uid}`);
    const listener = userListsRef.on('value', snapshot => {
      let data = snapshot.val();
      setLists(data);
    });

    return () => userListsRef.off('value', listener);
  }, [user]);

  return (
    <ListsContext.Provider value={{ lists }}>
      { children }
    </ListsContext.Provider>
  );
}

export default ListsProvider;;
