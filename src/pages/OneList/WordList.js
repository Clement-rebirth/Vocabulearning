import React from 'react';

import Word from './Word';
import NothingToShow from '../../components/NothingToShow/NothingToShow';

import { ROUTES } from '../../constants';

import noResultFoundImg from '../../assets/img/illustrations/undraw-void-dark-yellow.svg';
import emptyDataImg from '../../assets/img/illustrations/undraw-empty-dark-yellow.svg';

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
    toggleInvertWordWithTrad,
    openWordForm
  } = props;

  const backHome = () => {
    history.replace(ROUTES.HOME);
    disableSearchMode();
  };

  let { order, name, words = null } = wordList;

  if (words) {
    words = Object.keys(words).map(key => (
      <Word
        showRightPart={showRightPart}
        invertWordWithTrad={invertWordWithTrad}
        key={key}
        id={key}
        openWordCard={openWordCard}
        {...words[key]}
      />
    ));
  }

  let reverseClass = order === 'desc' ? 'reverse' : '';
  let invertClass = invertWordWithTrad ? 'invert' : '';
  let hideRightPartClass = showRightPart ? '' : 'hide-right-part';

  return (
    <div className='word-list'>
      <button
        className='back-home' 
        aria-label='retour à la page d&#39;accueil' 
        onClick={backHome}
      >
        <span className='material-icons-round'>arrow_back</span>
      </button>
      
      <div className='list-header'>
        <h2>
          { name } 
          <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>
        </h2>

        <button className='btn btn-primary add-word' onClick={openWordForm}>
          <span className='material-icons-round'>add</span>
          <span className='btn-text'>Ajouter un mot</span>
        </button>
      </div>
  
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
          className='hide-right-part-btn'
          onClick={toggleShowRightPart}
        >
          cacher
          <span className='material-icons-round'>
            { showRightPart ? 'visibility' : 'visibility_off' }
          </span>
        </button>
      </div>

      <div className={`words ${reverseClass} ${invertClass} ${hideRightPartClass}`}>
        
        { words }

        { !words && !searchMode &&
          <NothingToShow
            className='no-word'
            message='Votre liste ne contient aucun mot'
            src={emptyDataImg}
            alt='empty'
          /> 
        }

        { !words && searchMode &&
          <NothingToShow
            message='Aucun mot ne correspond à votre recherche'
            src={noResultFoundImg}
            alt='void'
          />
        }
      </div>
    </div>
  )
};

export default WordList;
