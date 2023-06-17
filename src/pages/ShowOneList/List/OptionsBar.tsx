interface OptionsBarProps {
  invertWordWithTrad: boolean;
  toggleInvertWordWithTrad: () => void;
  openWordForm: () => void;
  showRightPart: boolean;
  toggleShowRightPart: () => void;
}

export const OptionsBar = (props: OptionsBarProps) => {
  const {
    invertWordWithTrad,
    toggleInvertWordWithTrad,
    openWordForm,
    showRightPart,
    toggleShowRightPart,
  } = props;

  return (
    <div className='options-bar'>
      <button
        className={`invert-word-with-trad ${invertWordWithTrad && 'enable'}`}
        onClick={toggleInvertWordWithTrad}
      >
        <span className='material-symbols-rounded'>swap_horiz</span>
      </button>

      <button className='add-word' onClick={openWordForm}>
        <span className='material-symbols-rounded'>add</span>
      </button>

      <button
        className={`hide-right-part ${showRightPart && 'enable'}`}
        onClick={toggleShowRightPart}
      >
        <span className='material-symbols-rounded'>
          { showRightPart ? 'visibility' : 'visibility_off' }
        </span>
      </button>
    </div>
  );
};
