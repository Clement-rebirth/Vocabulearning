/**
 * get the list that match with the provided slug
 * @param {string} slug 
 * @param {object} lists 
 * @return return either the matching list or null if no list matched
 */
export const getMatchingListWithSlug = (slug, lists) => {

  if (!lists) return null;

  let listKey = Object
    .keys(lists)
    .filter(key => lists[key].slug === slug)[0];

  // no match : the list doesn't exist
  if (!listKey) return null;

  const list = {
    ...lists[listKey],
    id: listKey
  };

  return list;
};
