import React from 'react';
import { Link } from 'react-router-dom';

import Word from '../Word/Word';

import { ROUTES } from '../../constants';

const WordList = ({ name, words, openWordCard }) => {

  let nbWords = words ? Object.keys(words).length : 0;

  return (
    <div className='word-list'>
      <Link to={ROUTES.HOME}>Retour</Link>
      
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
          : <p className='no-word'>Votre liste ne contient aucun mot</p>
        }
      </div>
    </div>
  );
}

export default WordList;
