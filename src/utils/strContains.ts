import { removeAccents } from './removeAccents';

export const strContains = (str: string, strToContain: string) => {
  const strWithoutAccentsUppercase = removeAccents(str).toUpperCase();
  const strToContainWithoutAccentsUppercase = removeAccents(strToContain).toUpperCase();
  return strWithoutAccentsUppercase.includes(strToContainWithoutAccentsUppercase);
};
