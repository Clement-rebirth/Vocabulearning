/**
 * creates and returns a collection of word objects from a string list
 * @param {string} wordList
 * @return {array} word[] collection of word objects
 */
export const generateWordObjectsFromString = (wordList: string) => {
  return wordList
  .trim()
  .replace(/(\n|\r)+/g, '\n') // replaces multiple line breaks by one line break
  .split(/\n|\r/)
  .map(wordStr => {
    wordStr = wordStr.trim();
    const firstLetter = wordStr[0];

    if (!firstLetter) {
      throw new Error('Invalid string format');
    }

    // remove every "-" and spaces at the start of the string
    while (/-|\s/.test(firstLetter)) wordStr = wordStr.substring(1);

    let separators = ['->', '-\\s>', '=', ':'];
    let separatorsRegexStr = separators.reduce((result, separator) => {
      return `${separator}|${result}`;
    });

    let separatorsRegex = new RegExp(separatorsRegexStr);
    let separatorIndex = wordStr.search(separatorsRegex); // find index of first separator
    let word = wordStr.substring(0, separatorIndex); // extract word

    const matchResults = wordStr.match(separatorsRegex);
    let translation = wordStr;

    if (!matchResults) {
      throw new Error('Invalid format');
    }

    let separatorLength = matchResults[0].length; // get length of separator
    translation = wordStr.substring(separatorIndex + separatorLength); // extract substring after first separator

    word = word.trim();
    translation = translation.trim();

    return { word, translation };
  });
};
