import { removeAccents } from "./removeAccents";
import replaceSpecialCharsWithDash from "./replaceSpecialCharsWithDash";
import trim from "./trim";

/**
 * slugify a string and return it.
 * @param {string} str the string to slugify
 */
export const slugify = str => {
  if (!str) throw new Error('str parameter must not be empty');
  if (typeof str !== 'string') throw new Error('str parameter must be of type string');

  str = trim(str, ' '); // trim spaces
  str = str.toLowerCase();
  str = removeAccents(str);
  str = replaceSpecialCharsWithDash(str);

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  str = trim(str, '-');

  return str;
};
