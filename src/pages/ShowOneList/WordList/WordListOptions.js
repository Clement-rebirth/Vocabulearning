import React from 'react';

const WordListOptions = props => {

  const {
    toggleCurrentListOrder,
    order,
    toggleInvertWordWithTrad,
    invertWordWithTrad,
    toggleShowRightPart,
    showRightPart
  } = props;

  return (
    <div className='options'>
      <button 
        onClick={toggleCurrentListOrder}
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
  );
}
 
export default WordListOptions;
