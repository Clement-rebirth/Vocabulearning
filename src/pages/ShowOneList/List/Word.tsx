import { useEffect, useState } from 'react';
import { WordWithId } from '../../../types/word';

interface WordProps {
  wordObject: WordWithId;
  openWordCard: (word: WordWithId) => void;
  invertWordWithTrad: boolean;
  showRightPart: boolean;
}

export const Word = ({
  wordObject, openWordCard, invertWordWithTrad, showRightPart,
}: WordProps) => {
  // determine if the translation should be show if showRightPart is false
  // and the user click on it or not
  const [show, setShow] = useState(false);

  const { word, translation } = wordObject;

  const handleOpenWordCard = () => {
    if (showRightPart) openWordCard(wordObject);
  };

  const handleClick = () => {
    if (!showRightPart && !show) setShow(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleOpenWordCard();
    }
  };

  useEffect(() => {
    // if the user just toggled showRightPart
    if (!showRightPart) setShow(false);
  }, [showRightPart]);

  const showClass = show ? 'show' : '';

  return (
    <div
      className='word-box'
      onClick={handleOpenWordCard}
      tabIndex={0}
      role='button'
      onKeyDown={handleKeyDown}
    >
      <div className='word'>
        <p>{ invertWordWithTrad ? translation : word }</p>
      </div>
      <div className='separator'>
        <span className='material-symbols-rounded'>east</span>
      </div>
      <div className={`translation ${showClass}`}>
        {showRightPart ? (
          <p>{ invertWordWithTrad ? word : translation }</p>
        ) : (
          <button onClick={handleClick}>
            <span>{ invertWordWithTrad ? word : translation }</span>
          </button>
        )}
      </div>
    </div>
  );
};
