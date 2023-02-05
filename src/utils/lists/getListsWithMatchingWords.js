import { getMatchingWords } from './getMatchingWords';

// returns the lists whose words or translations contain the wordToSearch string
export const getListsWithMatchingWords = (wordToSearch, lists) => {
  if (!lists) return null;

  let matchingLists = {};

  Object
    .keys(lists)
    .filter(listKey => {
      let matchingWords = getMatchingWords(wordToSearch, lists[listKey]);
      return matchingWords !== null;
    })
    .forEach(listKey => matchingLists[listKey] = lists[listKey]);

  if (Object.keys(matchingLists).length === 0) matchingLists = null;
  return matchingLists;
};
