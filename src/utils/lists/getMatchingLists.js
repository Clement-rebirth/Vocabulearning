import { strContains } from "../strContains";

const getMatchingLists = (search, lists) => {
  if (!lists) return null;

  let matchingLists = {};

  Object
    .keys(lists)
    .filter(listKey => {
      let list = lists[listKey];
      return strContains(list.name, search);
    })
    .forEach(listKey => matchingLists[listKey] = lists[listKey]);

  if (Object.keys(matchingLists).length === 0) matchingLists = null;
  return matchingLists;
};

export default getMatchingLists;
