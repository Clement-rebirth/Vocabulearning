import './firebase';
import { getDatabase, push, ref, remove, update } from 'firebase/database';
import { slugify } from '../slugify';

export const addList = (wordList, userId) => {
  if (!wordList.name) throw new Error('name property must be defined');
  if (!wordList.words) wordList.words = false;

  const db = getDatabase();
  const listsRef = ref(db, `wordLists/${userId}`)
  push(listsRef, {
    ...wordList,
    slug: slugify(wordList.name),
    createdAt: Date.now(),
    order: 'asc'
  });
};

export const updateList = (propsToUpdate, listId, userId) => {
  const db = getDatabase();
  const listRef = ref(db, `wordLists/${userId}/${listId}`);
  return update(listRef, propsToUpdate);
};

export const deleteList = (listId, userId) => {
  const db = getDatabase();
  const listRef = ref(db, `wordLists/${userId}/${listId}`);
  return remove(listRef);
};
