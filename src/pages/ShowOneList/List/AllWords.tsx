import { useSearch } from '../../../contexts/SearchContext';
import { WordWithId, Words } from '../../../types/word';

import NoWordsToShow from './NoWordsToShow';
import Word from './Word';

interface AllWordsProps {
  words: Words;
  openWordCard: (word: WordWithId) => void;
  showRightPart: boolean;
  invertWordWithTrad: boolean;
  className?: string;
}

const AllWords = (props: AllWordsProps) => {

  const {
    words,
    openWordCard,
    showRightPart,
    invertWordWithTrad,
    className = ''
  } = props;

  let { matchingWords, searchMode } = useSearch();

  let noWordsInList = !words && !searchMode;
  let noSearchResult = !matchingWords && searchMode;

  let wordsToShow = searchMode ? matchingWords : words;

  return (
    <div className={`words ${className}`}>
      {wordsToShow && Object.keys(wordsToShow).map(key => {
        if (!wordsToShow) return null;
        const word = wordsToShow[key];
        if (!word) return null;
        return (
          <Word
            key={key}
            showRightPart={showRightPart}
            invertWordWithTrad={invertWordWithTrad}
            openWordCard={openWordCard}
            wordObject={{ ...word, id: key }}
          />
        );
      })}

      <NoWordsToShow noSearchResult={noSearchResult} noWordsInList={noWordsInList} />
    </div>
  );
}

export default AllWords;
