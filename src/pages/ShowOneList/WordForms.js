import React, { useState } from 'react';

import AddMultipleWordsForm from './AddMultipleWordsForm';
import AddWordForm from './AddWordForm';
import UpdateWordForm from './UpdateWordForm';

const WordForms = ({ currentWordListId, userId, wordToUpdate, closeModal, showPopUp }) => {

  const [addMultipleWordsMode, setAddMultipleWordsMode] = useState(false);

  if (wordToUpdate) return (
    <UpdateWordForm
      wordToUpdate={wordToUpdate}
      currentWordListId={currentWordListId}
      userId={userId}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );

  if (addMultipleWordsMode) return (
    <AddMultipleWordsForm
      currentWordListId={currentWordListId}
      userId={userId}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );

  return (
    <AddWordForm
      currentWordListId={currentWordListId}
      userId={userId}
      setAddMultipleWordsMode={setAddMultipleWordsMode}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );
}
 
export default WordForms;
