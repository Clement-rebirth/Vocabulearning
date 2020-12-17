import React, { useEffect, useState } from 'react';

const Word = props => {

  const { 
    id,
    word,
    translation,
    lastRepetition,
    openWordCard,
    invertWordWithTrad,
    showRightPart
  } = props;

  const [show, setShow] = useState(false);

  const handleOpenWordCard = () => {
    if (showRightPart) openWordCard({ id, word, translation, lastRepetition });
  };

  const handleClick = () => {
    if (!showRightPart && !show) setShow(true);
  };

  useEffect(() => {
    // if the user just toggled showRightPart
    if (!showRightPart) setShow(false);
  }, [showRightPart]);

  let showClass = show ? 'show' : '';

  return (
    <div 
      className='word-box'
      onClick={handleOpenWordCard}
    >
      <div className='word'>
        <p>{ invertWordWithTrad ? translation : word }</p>
      </div>
      <div className='separator'>
        <span className='material-icons-round'>east</span>
      </div>
      <div className={`translation ${showClass}`}>
        <p onClick={handleClick}>
          <span>{ invertWordWithTrad ? word : translation }</span>
        </p>
      </div>
    </div>
  );
}

export default Word;
