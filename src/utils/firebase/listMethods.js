import './firebase';
import { getDatabase, push, ref, remove, set, update } from 'firebase/database';
import { slugify } from '../slugify';

export const addList = (wordList, userId) => {
  if (!wordList.name) throw new Error('name property must be defined');
  if (!wordList.words) wordList.words = false;

  const db = getDatabase();
  const listsRef = ref(db, `wordLists/${userId}`);
  const newListRef = push(listsRef);
  const newListKey = newListRef.key;

  return set(newListRef, {
    ...wordList,
    slug: slugify(wordList.name) + newListKey,
    createdAt: Date.now(),
    order: 'asc'
  });
};

export const updateList = (propsToUpdate, userId, listId) => {
  const db = getDatabase();
  const listRef = ref(db, `wordLists/${userId}/${listId}`);
  return update(listRef, propsToUpdate);
};

export const deleteList = (userId, listId) => {
  const db = getDatabase();
  const listRef = ref(db, `wordLists/${userId}/${listId}`);
  return remove(listRef);
};
