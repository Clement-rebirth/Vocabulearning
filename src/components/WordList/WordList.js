import React from 'react';

import Word from '../Word/Word';

import { ROUTES } from '../../constants';

const WordList = props => {

  const { 
    name, 
    words, 
    openWordCard, 
    nbWords, 
    searchMode, 
    history, 
    disableSearchMode 
  } = props;

  const backHome = () => {
    history.replace(ROUTES.HOME);
    disableSearchMode();
  };

  return (
    <div className='word-list'>
      <button onClick={backHome}>Retour</button>
      
      <h2>
        { name } 
        <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>
      </h2>
  
      <div className='words'>
        { words ?
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
          : <p className='no-word'>
              { searchMode ? 'Aucun résultat ne correspond à votre recherche' : 'Votre liste ne contient aucun mot' }
            </p>
        }
      </div>
    </div>
  )
};

export default WordList;
