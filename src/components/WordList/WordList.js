import React from 'react';

import Word from '../Word/Word';

import { ROUTES } from '../../constants';

const WordList = props => {

  const {
    wordList,
    userId,
    openWordCard, 
    nbWords, 
    searchMode, 
    history, 
    disableSearchMode,
    showRightPart,
    invertWordWithTrad,
    toggleListOrder,
    toggleShowRightPart,
    toggleInvertWordWithTrad
  } = props;

  let { order, name, words } = wordList;

  const backHome = () => {
    history.replace(ROUTES.HOME);
    disableSearchMode();
  };

  let reverseClass = order === 'desc' ? 'reverse' : '';
  let invertClass = invertWordWithTrad ? 'invert' : '';
  let hideRightPartClass = showRightPart ? '' : 'hide-right-part';

  return (
    <div className='word-list'>
      <button onClick={backHome}>Retour</button>
      
      <h2>
        { name } 
        <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>
      </h2>
  
      <div className='options'>
        <button 
          onClick={() => toggleListOrder(order, wordList.id, userId)}
        >
          ordre
        </button>
        <button onClick={toggleInvertWordWithTrad}>en &lt;-&gt; fr</button>
        <button onClick={toggleShowRightPart}>Masquer</button>
      </div>

      <div className={`words ${reverseClass} ${invertClass} ${hideRightPartClass}`}>
        { words 
          ? Object.keys(words).map(key => (
              <Word
                invertWordWithTrad={invertWordWithTrad}
                key={key}
                id={key}
                openWordCard={openWordCard}
                {...words[key]}
              />
            ))
          : <p className='no-word'>
              { searchMode ? 'Aucun résultat ne correspond à votre recherche' : 'Votre liste ne contient aucun mot' }
            </p>
        }
      </div>
    </div>
  )
};

export default WordList;
