import { removeAccents } from './removeAccents';

export const strContains = (str: string, strToContain: string) => {
  str = removeAccents(str).toUpperCase();
  strToContain = removeAccents(strToContain).toUpperCase();
  return str.includes(strToContain);
};
