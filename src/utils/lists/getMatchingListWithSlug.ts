import { ListWithId, Lists } from '../../types/list';

/**
 * get the list that match with the provided slug
 * @param {string} slug
 * @param {object} lists
 * @return return either the matching list or null if no list matched
 */
export const getMatchingListWithSlug = (slug: string, lists: Lists): ListWithId | null => {

  if (!lists) return null;

  let matchingListKey = Object
    .keys(lists)
    .find(key => {
      const list = lists[key];
      if (!list) return false;
      return list.slug === slug
    });

  if (!matchingListKey) return null;

  const matchingList = lists[matchingListKey];
  if (!matchingList) return null;

  return {
    ...matchingList,
    id: matchingListKey,
  };
};
