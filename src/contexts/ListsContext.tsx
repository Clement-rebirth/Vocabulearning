import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import '../utils/firebase/firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { ListWithId, Lists } from '../types/list';

interface ListsContextValues {
  lists: Lists | null;
  listsLoading: boolean;
  list: ListWithId | null;
  setList: React.Dispatch<React.SetStateAction<ListWithId | null>>;
}

const ListsContext = createContext<ListsContextValues | null>(null);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState(null);
  const [listsLoading, setListsLoading] = useState(true);
  const [list, setList] = useState<ListWithId | null>(null);

  const { user } = useUser();

  useEffect(() => {
    // if user hasn't been loaded
    if (!user) return undefined;

    const db = getDatabase();
    const userListsRef = ref(db, `wordLists/${user.uid}`);

    // fetch user's wordLists and add a listener on it
    return onValue(userListsRef, snapshot => {
      const data = snapshot.val();
      setLists(data);
      setListsLoading(false);
    });
  }, [user]);

  return (
    <ListsContext.Provider value={{ lists, listsLoading, list, setList }}>
      { children }
    </ListsContext.Provider>
  );
};

export const useLists = () => {
  const context = useContext(ListsContext);

  if (!context) {
    throw new Error('useLists must be used within ListsProvider');
  }

  return context;
};
