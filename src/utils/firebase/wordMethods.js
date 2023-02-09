import './firebase';
import { getDatabase, push, ref, remove, update } from 'firebase/database';
import multiplePush from './multiplePush';

export const addWord = (word, wordListId, userId) => {
  if (!word.word) throw new Error('word property must be define');
  if (!word.translation) throw new Error('translation property must be define');

  const db = getDatabase();
  const wordsRef = ref(db, `wordLists/${userId}/${wordListId}/words`);
  return push(wordsRef, {
    ...word,
    nextRepetition: false,
    lastRepetition: false,
    lvl: 0,
    addedDate: Date.now()
  });
};

export const addMultipleWords = (words, wordListId, userId) => {
  words = words.map(word => ({
    ...word,
    nextRepetition: false,
    lastRepetition: false,
    lvl: 0,
    addedDate: Date.now()
  }));

  const db = getDatabase();
  const wordsRef = ref(db, `wordLists/${userId}/${wordListId}/words`);
  return multiplePush(wordsRef, words);
};

export const updateWord = (newWord, listId, userId, wordId) => {
  const db = getDatabase();
  const wordRef = ref(db, `wordLists/${userId}/${listId}/words/${wordId}`);
  return update(wordRef, newWord);
};

export const deleteWord = (listId, userId, wordId) => {
  const db = getDatabase();
  const wordRef = ref(db, `wordLists/${userId}/${listId}/words/${wordId}`);
  return remove(wordRef);
};
