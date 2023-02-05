/**
 * creates and returns a collection of word objects from a string list
 * @param {string} wordList 
 * @return {array} word[] collection of word objects
 */
export const generateWordObjectsFromString = wordList => {
  wordList = wordList
  .trim()
  .replace(/(\n|\r)+/g, '\n') // replaces multiple line breaks by one line break
  .split(/\n|\r/)
  .map(wordStr => {
    wordStr = wordStr.trim();

    // remove every "-" and spaces at the start of the string
    while (/-|\s/.test(wordStr[0])) wordStr = wordStr.substring(1);

    let separators = ['->', '-\\s>', '=', ':'];
    let separatorsRegexStr = separators.reduce((result, separator) => {
      return `${separator}|${result}`;
    });

    let separatorsRegex = new RegExp(separatorsRegexStr);
    let [word, translation] = wordStr.split(separatorsRegex);
    word = word.trim();
    translation = translation.trim();

    return { word, translation };
  });

  return wordList;
};
