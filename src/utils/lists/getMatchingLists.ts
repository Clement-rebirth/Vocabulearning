import { Lists } from '../../types/list';
import { strContains } from "../strContains";

const getMatchingLists = (search: string, lists: Lists | null) => {
  if (!lists) return null;

  let matchingLists: Lists = {};

  Object
    .keys(lists)
    .filter(key => {
      let list = lists[key];
      if (!list) return false;
      return strContains(list.name, search);
    })
    .forEach(key => {
      const list = lists[key];
      if (!list) return;
      matchingLists[key] = list;
    });

  if (Object.keys(matchingLists).length === 0) return null;
  return matchingLists;
};

export default getMatchingLists;
