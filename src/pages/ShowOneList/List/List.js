import React, { useState } from 'react';
import { updateList } from '../../../utils/firebase/listMethods';

import OptionsBar from './OptionsBar';
import AllWords from './AllWords';
import ListHeader from './ListHeader';
import ListOptions from './ListOptions';

const List = props => {

  const {
    list,
    userId,
    openWordCard,
    nbWords,
    searchMode,
    openWordForm
  } = props;

  const [showRightPart, setShowRightPart] = useState(true);
  const [invertWordWithTrad, setInvertWordWithTrad] = useState(false);

  const toggleListOrder = (currentOrder, listId, userId) => {
    let newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    updateList({ order: newOrder }, listId, userId);
  };

  const toggleShowRightPart = () => setShowRightPart(!showRightPart);
  const toggleInvertWordWithTrad = () => setInvertWordWithTrad(!invertWordWithTrad);

  let { order, name, words = null } = list;

  let reverseClass = order === 'desc' ? 'reverse' : '';
  let invertClass = invertWordWithTrad ? 'invert' : '';
  let hideRightPartClass = showRightPart ? '' : 'hide-right-part';

  return (
    <div className='list'>
      <ListHeader name={name} nbWords={nbWords} openWordForm={openWordForm} />

      <ListOptions
        toggleCurrentListOrder={() => toggleListOrder(order, list.id, userId)}
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

export default List;
