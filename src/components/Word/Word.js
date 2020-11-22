import React from 'react';

const Word = ({ id, word, translation }) => {
  return (
    <div className='word-box'>
      <p className='word'>{ word }</p>
      <div><span>-&#62;</span></div>
      <p className='translation'>{ translation }</p>
    </div>
  );
}

export default Word;
