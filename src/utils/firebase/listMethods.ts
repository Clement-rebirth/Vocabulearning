import './firebase';
import { getDatabase, push, ref, remove, set, update } from 'firebase/database';
import { slugify } from '../slugify';
import { List } from '../../types/list';

export const addList = (listName: string, userId: string) => {
  // if (!list.words) list.words = false;

  const db = getDatabase();
  const listsRef = ref(db, `wordLists/${userId}`);
  const newListRef = push(listsRef);
  const newListKey = newListRef.key;

  const newList: List = {
    name: listName,
    slug: slugify(listName) + newListKey,
    createdAt: Date.now(),
    order: 'asc',
    words: false,
  };

  return set(newListRef, newList);
};

export const updateList = (propsToUpdate: Partial<List>, userId: string, listId: string) => {
  const db = getDatabase();
  const listRef = ref(db, `wordLists/${userId}/${listId}`);
  return update(listRef, propsToUpdate);
};

export const deleteList = (userId: string, listId: string) => {
  const db = getDatabase();
  const listRef = ref(db, `wordLists/${userId}/${listId}`);
  return remove(listRef);
};
