import { List } from '../../types/list';
import { Words } from '../../types/word';
import { strContains } from '../strContains';

// returns the word objects whose word or translation contains the wordToSearch string
export const getMatchingWords = (wordToSearch: string, list: List) => {
  if (!list) return null;

  const words = list.words;
  if (!words) return null;

  const matchingWords: Words = {};

  Object
    .keys(words)
    .filter(wordKey => {
      const wordObj = words[wordKey];
      if (!wordObj) return false;
      const wordContainsSearch = strContains(wordObj.word, wordToSearch);
      const translationContainsSearch = strContains(wordObj.translation, wordToSearch);

      return wordContainsSearch || translationContainsSearch;
    })
    .forEach(wordKey => {
      const wordObj = words[wordKey];
      if (!wordObj) return;
      matchingWords[wordKey] = wordObj;
    });

  if (Object.keys(matchingWords).length === 0) return null;
  return matchingWords;
};
