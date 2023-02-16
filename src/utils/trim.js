const trim = (string, charToTrim) => {
  const regex = new RegExp(`^${charToTrim}+|${charToTrim}+$`, 'g');
  return string.replace(regex, '');
};

export default trim;
