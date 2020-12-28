import React, { useState } from 'react';

import AddMultipleWordsForm from './AddMultipleWordsForm';
import AddWordForm from './AddWordForm';
import UpdateWordForm from './UpdateWordForm';

const WordForms = ({ currentListId, userId, wordToUpdate, closeModal, showPopUp }) => {

  const [addMultipleWordsMode, setAddMultipleWordsMode] = useState(false);

  if (wordToUpdate) return (
    <UpdateWordForm
      wordToUpdate={wordToUpdate}
      currentListId={currentListId}
      userId={userId}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );

  if (addMultipleWordsMode) return (
    <AddMultipleWordsForm
      currentListId={currentListId}
      userId={userId}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );

  return (
    <AddWordForm
      currentListId={currentListId}
      userId={userId}
      setAddMultipleWordsMode={setAddMultipleWordsMode}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );
}
 
export default WordForms;
