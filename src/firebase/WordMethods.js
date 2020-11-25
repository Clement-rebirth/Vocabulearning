import Manager from './Manager';
import firebase from './firebase';

export const addWord = (word, wordListId, userId) => {
  let wordsManager = new Manager(`wordLists/${userId}/${wordListId}/words`);
  wordsManager.add({
    word: word.word,
    translation: word.translation,
    lastRepetition: false,
    lvl: 0,
    addedDate: firebase.database.ServerValue.TIMESTAMP
  });
};

export const addMultipleWords = (words, wordListId, userId, onComplete = () => {}) => {
  let wordsManager = new Manager(`wordLists/${userId}/${wordListId}/words`);

  words = words.map(word => ({
    ...word,
    lastRepetition: false,
    lvl: 0,
    addedDate: firebase.database.ServerValue.TIMESTAMP
  }));

  wordsManager.multipleAdd(words, onComplete);
};

export const updateWord = (newWord, wordListId, userId, wordId) => {
  let wordManager = new Manager(`wordLists/${userId}/${wordListId}/words/${wordId}`);
  wordManager.update({
    word: newWord.word,
    translation: newWord.translation
  });
};

export const deleteWord = (wordListId, userId, wordId, onComplete = () => {}) => {
  let wordManager = new Manager(`wordLists/${userId}/${wordListId}/words/${wordId}`);
  wordManager.delete(onComplete);
};
