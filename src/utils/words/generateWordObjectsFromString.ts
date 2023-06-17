/**
 * creates and returns a collection of word objects from a string list
 */
export const generateWordObjectsFromString = (wordList: string) => {
  return wordList
    .trim()
    .replace(/(\n|\r)+/g, '\n') // replaces multiple line breaks by one line break
    .split(/\n|\r/)
    .map(str => {
      let wordStr = str.trim();
      wordStr = wordStr.replace(/^(-)*/, ''); // remove all hyphens at the beginning

      const separators = ['->', '-\\s>', '=', ':'];
      const separatorsRegexStr = separators.reduce((result, separator) => {
        return `${separator}|${result}`;
      });

      const separatorsRegex = new RegExp(separatorsRegexStr);
      const separatorIndex = wordStr.search(separatorsRegex); // find index of first separator
      let word = wordStr.substring(0, separatorIndex); // extract word

      const matchResults = wordStr.match(separatorsRegex);
      let translation = wordStr;

      if (!matchResults) {
        throw new Error('Invalid format');
      }

      const separatorLength = matchResults[0].length; // get length of separator

      // extract substring after first separator
      translation = wordStr.substring(separatorIndex + separatorLength);

      word = word.trim();
      translation = translation.trim();

      return { word, translation };
    });
};
