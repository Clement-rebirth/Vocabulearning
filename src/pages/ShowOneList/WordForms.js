import React, { useState } from 'react';

import AddMultipleWordsForm from './AddMultipleWordsForm';
import AddWordForm from './AddWordForm';
import UpdateWordForm from './UpdateWordForm';

const WordForms = ({ listId, userId, wordToUpdate, closeModal, showPopUp }) => {

  const [addMultipleWordsMode, setAddMultipleWordsMode] = useState(false);

  if (wordToUpdate) return (
    <UpdateWordForm
      wordToUpdate={wordToUpdate}
      listId={listId}
      userId={userId}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );

  if (addMultipleWordsMode) return (
    <AddMultipleWordsForm
      listId={listId}
      userId={userId}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );

  return (
    <AddWordForm
      listId={listId}
      userId={userId}
      setAddMultipleWordsMode={setAddMultipleWordsMode}
      closeModal={closeModal}
      showPopUp={showPopUp}
    />
  );
}
 
export default WordForms;
