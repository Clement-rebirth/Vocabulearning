import Manager from './Manager';
import firebase from './firebase';

import { slugify } from '../slugify';

export const addList = (wordList, userId) => {
  if (!wordList.name) throw new Error('name property must be defined');
  if (!wordList.words) wordList.words = false;

  const listsRef = firebase.database().ref(`wordLists/${userId}`);

  listsRef.push({
    ...wordList,
    slug: slugify(wordList.name),
    addedDate: firebase.database.ServerValue.TIMESTAMP,
    order: 'asc'
  });
};

export const updateList = (propsToUpdate, listId, userId) => {
  const listRef = firebase.database().ref(`wordLists/${userId}/${listId}`);
  return listRef.update(propsToUpdate);
};

export const deleteList = (listId, userId) => {
  const listRef = firebase.database().ref(`wordLists/${userId}/${listId}`);
  return listRef.remove();
};
