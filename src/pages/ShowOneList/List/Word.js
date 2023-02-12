import { useEffect, useState } from 'react';

const Word = ({ wordObject, openWordCard, invertWordWithTrad, showRightPart }) => {

  // determine if the translation should be show if showRightPart is false
  // and the user click on it or not
  const [show, setShow] = useState(false);

  let { id, word, translation, lastReview } = wordObject;

  const handleOpenWordCard = () => {
    if (showRightPart) openWordCard({ id, word, translation, lastReview });
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
