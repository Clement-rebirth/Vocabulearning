const containsOnlySpecialChars = str => {
  return /^[^a-zA-Z0-9]*$/.test(str);
};

export default containsOnlySpecialChars;
