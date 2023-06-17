import { List } from '../../types/list';
import { Words } from '../../types/word';
import { strContains } from '../strContains';

// returns the word objects whose word or translation contains the wordToSearch string
export const getMatchingWords = (wordToSearch: string, list: List) => {
  if (!list) return null;

  const words = list.words;
  if (!words) return null;

  let matchingWords: Words = {};

  Object
    .keys(words)
    .filter(wordKey => {
      let wordObj = words[wordKey];
      if (!wordObj) return false;
      let wordContainsSearch = strContains(wordObj.word, wordToSearch);
      let translationContainsSearch = strContains(wordObj.translation, wordToSearch);

      return wordContainsSearch || translationContainsSearch;
    })
    .forEach(wordKey => {
      let wordObj = words[wordKey];
      if (!wordObj) return;
      matchingWords[wordKey] = wordObj;
    });

  if (Object.keys(matchingWords).length === 0) return null;
  return matchingWords;
};
