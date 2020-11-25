import React from 'react';

const WordListInfo = ({ wordList, openWordList }) =>  (
  <div className='word-list-info' onClick={() => openWordList(wordList.slug)}>
    <h2>{ wordList.name }</h2>
    
    <div className='actions'>
      <button className='edit-word-list'>Modifier</button>
      <button className='delete-word-list'>Supprimer</button>
    </div>
  </div>
);

export default WordListInfo;
