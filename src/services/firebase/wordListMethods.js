import Manager from './Manager';
import firebase from './firebase';

import { slugify } from '../slugify';

export const addWordList = (wordList, userId) => {
  if (!wordList.name) throw new Error('name property must be defined');
  if (!wordList.words) wordList.words = false;

  let wordListsManager = new Manager(`wordLists/${userId}`);
  wordListsManager.add({
    ...wordList,
    slug: slugify(wordList.name),
    addedDate: firebase.database.ServerValue.TIMESTAMP,
    order: 'asc'
  });
};

export const updateWordList = (propsToUpdate, wordListId, userId) => {
  let wordListManager = new Manager(`wordLists/${userId}/${wordListId}`);
  wordListManager.update(propsToUpdate);
};

export const deleteWordList = (wordListId, userId, onComplete = () => {}) => {
  let wordListManager = new Manager(`wordLists/${userId}/${wordListId}`);
  wordListManager.delete(onComplete);
};
