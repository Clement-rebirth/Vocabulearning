import React, { useState } from 'react';
import { updateList } from '../../../services/firebase/listMethods';

import OptionsBar from './OptionsBar';
import AllWords from './AllWords';
import WordListHeader from './WordListHeader';
import WordListOptions from './WordListOptions';

const WordList = props => {

  const {
    wordList,
    userId,
    openWordCard, 
    nbWords, 
    searchMode,
    openWordForm
  } = props;

  const [showRightPart, setShowRightPart] = useState(true);
  const [invertWordWithTrad, setInvertWordWithTrad] = useState(false);

  const toggleListOrder = (currentOrder, wordListId, userId) => {
    let newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    updateList({ order: newOrder }, wordListId, userId);
  };

  const toggleShowRightPart = () => setShowRightPart(!showRightPart);
  const toggleInvertWordWithTrad = () => setInvertWordWithTrad(!invertWordWithTrad);

  let { order, name, words = null } = wordList;

  let reverseClass = order === 'desc' ? 'reverse' : '';
  let invertClass = invertWordWithTrad ? 'invert' : '';
  let hideRightPartClass = showRightPart ? '' : 'hide-right-part';

  return (
    <div className='list'>
      <WordListHeader name={name} nbWords={nbWords} openWordForm={openWordForm} />
  
      <WordListOptions
        toggleCurrentListOrder={() => toggleListOrder(order, wordList.id, userId)}
        order={order}
        toggleInvertWordWithTrad={toggleInvertWordWithTrad}
        invertWordWithTrad={invertWordWithTrad}
        toggleShowRightPart={toggleShowRightPart}
        showRightPart={showRightPart}
      />

      <AllWords
        words={words}
        searchMode={searchMode}
        openWordCard={openWordCard}
        showRightPart={showRightPart}
        invertWordWithTrad={invertWordWithTrad}
        className={`${reverseClass} ${invertClass} ${hideRightPartClass}`}
      />

      <OptionsBar
        invertWordWithTrad={invertWordWithTrad}
        toggleInvertWordWithTrad={toggleInvertWordWithTrad}
        openWordForm={openWordForm}
        showRightPart={showRightPart}
        toggleShowRightPart={toggleShowRightPart}
      />
    </div>
  )
};

export default WordList;
