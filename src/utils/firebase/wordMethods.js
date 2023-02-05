import Manager from './Manager';
import firebase from './firebase';

export const addWord = (word, wordListId, userId, onComplete = () => {}) => {
  if (!word.word) throw new Error('word property must be define');
  if (!word.translation) throw new Error('translation property must be define');
  
  let wordsManager = new Manager(`wordLists/${userId}/${wordListId}/words`);

  wordsManager.add({
    ...word,
    nextRepetition: false,
    lastRepetition: false,
    lvl: 0,
    addedDate: firebase.database.ServerValue.TIMESTAMP
  }, onComplete);
};

export const addMultipleWords = (words, wordListId, userId, onComplete = () => {}) => {
  let wordsManager = new Manager(`wordLists/${userId}/${wordListId}/words`);

  words = words.map(word => ({
    ...word,
    nextRepetition: false,
    lastRepetition: false,
    lvl: 0,
    addedDate: firebase.database.ServerValue.TIMESTAMP
  }));

  wordsManager.multipleAdd(words, onComplete);
};

export const updateWord = (newWord, wordListId, userId, wordId, onComplete = () => {}) => {
  let wordManager = new Manager(`wordLists/${userId}/${wordListId}/words/${wordId}`);
  wordManager.update(newWord, onComplete);
};

export const deleteWord = (wordListId, userId, wordId, onComplete = () => {}) => {
  let wordManager = new Manager(`wordLists/${userId}/${wordListId}/words/${wordId}`);
  wordManager.delete(onComplete);
};
