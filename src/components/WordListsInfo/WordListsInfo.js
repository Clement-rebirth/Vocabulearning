import React from 'react';
import WordListInfo from '../WordListInfo/WordListInfo';

const WordListsInfo = ({ wordLists, openWordList }) => (
  <div className='word-lists'>
    { wordLists ? (
      Object
      .keys(wordLists)
      .map(key => (
        <WordListInfo 
          key={key} 
          wordList={{...wordLists[key], key}} 
          openWordList={openWordList} 
        />
      ))) : (
        <p className='no-list'>Vous n'avez aucune liste</p>
      )
    }
  </div>
);

export default WordListsInfo;
