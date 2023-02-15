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
    nextReview: false,
    lastReview: false,
    lvl: 0,
    createdAt: Date.now()
  });
};

export const addMultipleWords = (words, userId, wordListId) => {
  words = words.map(word => ({
    ...word,
    nextReview: false,
    lastReview: false,
    lvl: 0,
    createdAt: Date.now()
  }));

  const db = getDatabase();
  const wordsRef = ref(db, `wordLists/${userId}/${wordListId}/words`);
  return multiplePush(wordsRef, words);
};

export const updateWord = (newWord, userId, listId, wordId) => {
  const db = getDatabase();
  const wordRef = ref(db, `wordLists/${userId}/${listId}/words/${wordId}`);
  return update(wordRef, newWord);
};

export const deleteWord = (userId, listId, wordId) => {
  const db = getDatabase();
  const wordRef = ref(db, `wordLists/${userId}/${listId}/words/${wordId}`);
  return remove(wordRef);
};
