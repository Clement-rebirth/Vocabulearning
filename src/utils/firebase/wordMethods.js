import Manager from './Manager';
import firebase from './firebase';
import multiplePush from './multiplePush';

export const addWord = (word, wordListId, userId, onComplete = () => {}) => {
  if (!word.word) throw new Error('word property must be define');
  if (!word.translation) throw new Error('translation property must be define');

  const wordsRef = firebase.database().ref(`wordLists/${userId}/${wordListId}/words`);

  wordsRef.push({
    ...word,
    nextRepetition: false,
    lastRepetition: false,
    lvl: 0,
    addedDate: firebase.database.ServerValue.TIMESTAMP
  }, onComplete);
};

export const addMultipleWords = (words, wordListId, userId, onComplete = () => {}) => {
  words = words.map(word => ({
    ...word,
    nextRepetition: false,
    lastRepetition: false,
    lvl: 0,
    addedDate: firebase.database.ServerValue.TIMESTAMP
  }));

  const wordsRef = firebase.database().ref(`wordLists/${userId}/${wordListId}/words`);
  multiplePush(wordsRef, words).then(onComplete);
};

export const updateWord = (newWord, listId, userId, wordId) => {
  const wordRef = firebase.database().ref(`wordLists/${userId}/${listId}/words/${wordId}`);
  return wordRef.update(newWord);
};

export const deleteWord = (listId, userId, wordId) => {
  const wordRef = firebase.database().ref(`wordLists/${userId}/${listId}/words/${wordId}`);
  return wordRef.remove();
};
