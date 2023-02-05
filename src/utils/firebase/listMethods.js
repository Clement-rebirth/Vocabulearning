import Manager from './Manager';
import firebase from './firebase';

import { slugify } from '../slugify';

export const addList = (wordList, userId) => {
  if (!wordList.name) throw new Error('name property must be defined');
  if (!wordList.words) wordList.words = false;

  let listManager = new Manager(`wordLists/${userId}`);
  listManager.add({
    ...wordList,
    slug: slugify(wordList.name),
    addedDate: firebase.database.ServerValue.TIMESTAMP,
    order: 'asc'
  });
};

export const updateList = (propsToUpdate, listId, userId) => {
  let listManager = new Manager(`wordLists/${userId}/${listId}`);
  listManager.update(propsToUpdate);
};

export const deleteList = (listId, userId, onComplete = () => {}) => {
  let listManager = new Manager(`wordLists/${userId}/${listId}`);
  listManager.delete(onComplete);
};
