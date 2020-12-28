import React from 'react';

import NoWordsToShow from './NoWordsToShow';
import Word from './Word';

const AllWords = props => {

  const {
    words,
    searchMode,
    openWordCard,
    showRightPart,
    invertWordWithTrad,
    className = '' 
  } = props;

  let noSearchResult = !words && searchMode;
  let noWordsInList = !words && !searchMode;

  return (
    <div className={`words ${className}`}>
      {words && Object.keys(words).map(key => (
        <Word
          showRightPart={showRightPart}
          invertWordWithTrad={invertWordWithTrad}
          key={key}
          id={key}
          openWordCard={openWordCard}
          {...words[key]}
        />
      ))}

      <NoWordsToShow noSearchResult={noSearchResult} noWordsInList={noWordsInList} />
    </div>
  );
}
 
export default AllWords;
