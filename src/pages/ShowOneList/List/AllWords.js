import { useContext } from 'react';
import { SearchContext } from '../../../providers/SearchProvider';

import NoWordsToShow from './NoWordsToShow';
import Word from './Word';

const AllWords = props => {

  const {
    words,
    openWordCard,
    showRightPart,
    invertWordWithTrad,
    className = ''
  } = props;

  let { matchingWords, searchMode } = useContext(SearchContext);

  let noWordsInList = !words && !searchMode;
  let noSearchResult = !matchingWords && searchMode;

  let wordsToShow = searchMode ? matchingWords : words;

  return (
    <div className={`words ${className}`}>
      {wordsToShow && Object.keys(wordsToShow).map(key => (
        <Word
          key={key}
          showRightPart={showRightPart}
          invertWordWithTrad={invertWordWithTrad}
          openWordCard={openWordCard}
          wordObject={{ ...wordsToShow[key], id: key }}
        />
      ))}

      <NoWordsToShow noSearchResult={noSearchResult} noWordsInList={noWordsInList} />
    </div>
  );
}

export default AllWords;
