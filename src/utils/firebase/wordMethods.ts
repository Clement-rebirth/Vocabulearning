import './firebase';
import { getDatabase, push, ref, remove, update } from 'firebase/database';
import { multiplePush } from './multiplePush';
import { WordFormData } from '../../types/word';

export const addWord = (word: WordFormData, wordListId: string, userId: string) => {
  if (!word.word) throw new Error('word property must be define');
  if (!word.translation) throw new Error('translation property must be define');

  const db = getDatabase();
  const wordsRef = ref(db, `wordLists/${userId}/${wordListId}/words`);
  return push(wordsRef, {
    ...word,
    nextReview: false,
    lastReview: false,
    lvl: 0,
    createdAt: Date.now(),
  });
};

export const addMultipleWords = (wordsData: WordFormData[], userId: string, wordListId: string) => {
  const words = wordsData.map(word => ({
    ...word,
    nextReview: false,
    lastReview: false,
    lvl: 0,
    createdAt: Date.now(),
  }));

  const db = getDatabase();
  const wordsRef = ref(db, `wordLists/${userId}/${wordListId}/words`);
  return multiplePush(wordsRef, words);
};

export const updateWord = (
  newWord: WordFormData, userId: string, listId: string, wordId: string,
) => {
  const db = getDatabase();
  const wordRef = ref(db, `wordLists/${userId}/${listId}/words/${wordId}`);
  return update(wordRef, newWord);
};

export const deleteWord = (userId: string, listId: string, wordId: string) => {
  const db = getDatabase();
  const wordRef = ref(db, `wordLists/${userId}/${listId}/words/${wordId}`);
  return remove(wordRef);
};
