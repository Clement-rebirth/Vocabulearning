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

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;'";
  const to   = "aaaaeeeeiiiioooouuuunc-------";

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  str = trim(str, '-');

  return str;
};
