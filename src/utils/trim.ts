export const trim = (string: string, charToTrim: string) => {
  const regex = new RegExp(`^${charToTrim}+|${charToTrim}+$`, 'g');
  return string.replace(regex, '');
};
