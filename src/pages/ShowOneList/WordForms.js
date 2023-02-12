import { useState } from 'react';

import AddMultipleWordsForm from './AddMultipleWordsForm';
import AddWordForm from './AddWordForm';
import UpdateWordForm from './UpdateWordForm';

const WordForms = ({ wordToUpdate, closeModal }) => {

  const [addMultipleWordsMode, setAddMultipleWordsMode] = useState(false);

  if (wordToUpdate) return (
    <UpdateWordForm wordToUpdate={wordToUpdate} closeModal={closeModal} />
  );

  if (addMultipleWordsMode) return (
    <AddMultipleWordsForm closeModal={closeModal} />
  );

  return (
    <AddWordForm
      setAddMultipleWordsMode={setAddMultipleWordsMode}
      closeModal={closeModal}
    />
  );
}

export default WordForms;
