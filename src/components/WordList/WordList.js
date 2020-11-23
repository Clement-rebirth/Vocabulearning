import React from 'react';

import Word from '../Word/Word';

const WordList = ({ name, words }) => {
  return (
    <div className='word-list'>
      {/* <h2>{ name }</h2> */}
      <div className='words'>
        { words &&
          Object
            .keys(words)
            .map(key => (
              <Word 
                key={key}
                id={key}
                word={words[key].word}
                translation={words[key].translation} />
            ))
        }
      </div>
    </div>
  );
}

export default WordList;
