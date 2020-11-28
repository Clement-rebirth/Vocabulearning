import React from 'react';

const Word = ({ id, word, translation, lastRepetition, openWordCard, invertWordWithTrad }) => {
  return (
    <div 
      className='word-box'
      onClick={() => openWordCard({ id, word, translation, lastRepetition })}
    >
      <p className='word'>{ invertWordWithTrad ? translation : word }</p>
      <div className='separator'><span>-&#62;</span></div>
      <p className='translation'>{ invertWordWithTrad ? word : translation }</p>
    </div>
  );
}

export default Word;
