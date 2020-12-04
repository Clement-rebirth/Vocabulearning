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
      <button aria-label='retour à la page d&#39;accueil' onClick={backHome}>
        <span className='material-icons-round'>arrow_back</span>
      </button>
      
      <h2>
        { name } 
        <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>
      </h2>
  
      <div className='options'>
        <button 
          onClick={() => toggleListOrder(order, wordList.id, userId)}
          className='order'
        >
          ordre
          <span className='material-icons-round'>
            { order === 'asc' ? 'arrow_drop_down' : 'arrow_drop_up' }
          </span>
        </button>

        <button 
          onClick={toggleInvertWordWithTrad}
          className='invert-word-with-trad'
        >
          { invertWordWithTrad ? 'fr' : 'en' }
          <span className='material-icons-round'>swap_horiz</span>
          { invertWordWithTrad ? 'en' : 'fr' }
        </button>

        <button 
          onClick={toggleShowRightPart}
        >
          Masquer
          <span className='material-icons-round'>
            { showRightPart ? 'visibility' : 'visibility_off' }
          </span>
        </button>
      </div>

      <div className={`words ${reverseClass} ${invertClass} ${hideRightPartClass}`}>
        { words 
          ? Object.keys(words).map(key => (
              <Word
                showRightPart={showRightPart}
                invertWordWithTrad={invertWordWithTrad}
                key={key}
                id={key}
                openWordCard={openWordCard}
                {...words[key]}
              />
            ))
          : <p className={ searchMode ? 'no-result' : 'no-word' }>
              { searchMode ? 'Aucun résultat ne correspond à votre recherche' : 'Votre liste ne contient aucun mot' }
            </p>
        }
      </div>
    </div>
  )
};

export default WordList;
