import { strContains } from '../strContains';

// returns the word objects whose word or translation contains the wordToSearch string
export const getMatchingWords = (wordToSearch, list) => {
  if (!list || !list.words) return null;

  let matchingWords = {};

  Object
    .keys(list.words)
    .filter(wordKey => {
      let wordObj = list.words[wordKey];
      let wordContainsSearch = strContains(wordObj.word, wordToSearch);
      let translationContainsSearch = strContains(wordObj.translation, wordToSearch);

      return wordContainsSearch || translationContainsSearch;
    })
    .forEach(wordKey => matchingWords[wordKey] = list.words[wordKey]);

  if (Object.keys(matchingWords).length === 0) matchingWords = null;
  return matchingWords;
};
