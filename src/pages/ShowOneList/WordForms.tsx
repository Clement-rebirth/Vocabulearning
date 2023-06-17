import { useState } from 'react';
import { WordWithId } from '../../types/word';

import { AddMultipleWordsForm } from './AddMultipleWordsForm';
import { AddWordForm } from './AddWordForm';
import { UpdateWordForm } from './UpdateWordForm';

interface WordFormsProps {
  wordToUpdate: WordWithId | null;
  closeModal: () => void;
}

export const WordForms = ({ wordToUpdate, closeModal }: WordFormsProps) => {
  const [addMultipleWordsMode, setAddMultipleWordsMode] = useState(false);

  if (wordToUpdate) {
    return (
      <UpdateWordForm wordToUpdate={wordToUpdate} closeModal={closeModal} />
    );
  }

  if (addMultipleWordsMode) {
    return (
      <AddMultipleWordsForm closeModal={closeModal} />
    );
  }

  return (
    <AddWordForm
      setAddMultipleWordsMode={setAddMultipleWordsMode}
      closeModal={closeModal}
    />
  );
};
