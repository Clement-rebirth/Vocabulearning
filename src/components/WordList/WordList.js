import React from 'react';

import Word from '../Word/Word';

const WordList = ({ name, words, openWordCard }) => {
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
