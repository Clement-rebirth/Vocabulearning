import React from 'react';

const Word = ({ id, word, translation, lastRepetition, openWordCard }) => {
  return (
    <div 
      className='word-box'
      onClick={() => openWordCard({ id, word, translation, lastRepetition })} 
    >
      <p className='word'>{ word }</p>
      <div><span>-&#62;</span></div>
      <p className='translation'>{ translation }</p>
    </div>
  );
}

export default Word;
