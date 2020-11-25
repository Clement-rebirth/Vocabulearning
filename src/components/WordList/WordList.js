import React from 'react';

import Word from '../Word/Word';

const WordList = ({ name, words, openWordCard }) => {

  let nbWords = words && Object.keys(words).length;

  return (
    <div className='word-list'>
      <h2>
        { name } 
        <span className='nb-words'>({ nbWords } mot{ nbWords > 1 && 's' })</span>
      </h2>

      <div className='words'>
        { words &&
          Object
            .keys(words)
            .map(key => (
              <Word 
                key={key}
                id={key}
                openWordCard={openWordCard}
                {...words[key]}
              />
            ))
        }
      </div>
    </div>
  );
}

export default WordList;
