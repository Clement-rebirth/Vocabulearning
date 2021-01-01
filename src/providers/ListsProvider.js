import React, { createContext, useContext, useEffect, useState } from 'react';
import Manager from '../services/firebase/Manager';
import { UserContext } from './UserProvider';

export const ListsContext = createContext({
  lists: false
});

const ListsProvider = ({ children }) => {

  const [lists, setLists] = useState(false);

  let { user } = useContext(UserContext);

  useEffect(() => {
    // if user hasn't been loaded
    if (!user) return;
    
    // fetch user's wordLists and add a listener on it
    let userListsManager = new Manager(`wordLists/${user.uid}`);
    userListsManager.getAll(snapshot => {
      let data = snapshot.val();
      setLists(data);
    });

    return () => userListsManager.close();
  }, [user]);
  
  return (
    <ListsContext.Provider value={{ lists }}>
      { children }
    </ListsContext.Provider>
  );
}
 
export default ListsProvider;
