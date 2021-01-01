import React, { useEffect, useRef, useState } from 'react';
import { addMultipleWords } from '../../services/firebase/wordMethods';
import { generateWordObjectsFromString } from '../../services/words/generateWordObjectsFromString';
import { validateWord } from '../../services/words/validateWord';

const AddMultipleWordsForm = ({ listId, userId, closeModal, showPopUp }) => {

  const [words, setWords] = useState('');
  const [wordsError, setWordsError] = useState(null);

  let wordsFieldRef = useRef(null);

  useEffect(() => {
    wordsFieldRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    let wordObjects;

    try {
      wordObjects = generateWordObjectsFromString(words);
    } catch (error) {
      setWordsError('Format invalide');
      return;
    }

    let errors, isErrorsEmpty;

    // for .. of instead of forEach in order to break
    for (const wordObj of wordObjects) {
      errors = validateWord(wordObj);
      isErrorsEmpty = Object.keys(errors).length === 0;
      
      if (!isErrorsEmpty) break;
    }
    
    if (!isErrorsEmpty) {
      setWordsError('Les mots et les traductions doivent contenir entre 1 et 1000 caractères');
      return;
    };

    addMultipleWords(wordObjects, listId, userId, () => {
      closeModal();
      showPopUp('Tous les mots ont été ajoutés avec succès');
    });
  };

  return (
    <form className='word-form' onSubmit={handleSubmit }>
      <div className='list-field'>
        <label htmlFor='multi-words'>Coller votre liste de mots (1 mot par ligne)</label>
        <textarea
          ref={wordsFieldRef}
          className='form-elt'
          name='words'
          id='multi-words'
          required
          value={words}
          onChange={e => setWords(e.target.value)}
          placeholder='mot en anglais : traduction(s)'
        ></textarea>

        <small className={ wordsError ? 'invalid-message' : '' }>
          { wordsError }
        </small>

        <ul className='info'>
          <li>les tirets sont acceptés en début de ligne</li>
          <li>plusieurs séparateurs sont acceptés (:, -&#62;, =)</li>
          <li>Un seul séparateur par ligne</li>
        </ul>
      </div>

      <div className='actions'>
        <button className='btn btn-text-primary' onClick={closeModal} type='button'>
          Annuler
        </button>
        <button className='btn btn-primary' type='submit'>
          Ajouter
        </button>
      </div>
    </form>
  );
}
 
export default AddMultipleWordsForm;
