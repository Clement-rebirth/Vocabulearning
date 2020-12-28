import React from 'react';

const OptionsBar = props => {

  const {
    invertWordWithTrad,
    toggleInvertWordWithTrad,
    openWordForm,
    showRightPart,
    toggleShowRightPart
  } = props;

  return (
    <div className='options-bar'>
      <button 
        className={`invert-word-with-trad ${invertWordWithTrad && 'enable'}`} 
        onClick={toggleInvertWordWithTrad}
      >
        <span className='material-icons-round'>swap_horiz</span>
      </button>

      <button className='add-word' onClick={openWordForm}>
        <span className='material-icons-round'>add</span>
      </button>

      <button 
        className={`hide-right-part ${showRightPart && 'enable'}`} 
        onClick={toggleShowRightPart}
      >
        <span className='material-icons-round'>
          { showRightPart ? 'visibility' : 'visibility_off' }
        </span>
      </button>
    </div>
  );
}
 
export default OptionsBar;
