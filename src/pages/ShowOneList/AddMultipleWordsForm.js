import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { addMultipleWords } from '../../utils/firebase/wordMethods';
import { generateWordObjectsFromString } from '../../utils/words/generateWordObjectsFromString';
import { validateWord } from '../../utils/words/validateWord';
import { UserContext } from '../../providers/UserProvider';
import { PopUpContext } from '../../providers/PopUpProvider';
import { ListsContext } from '../../providers/ListsProvider';

const AddMultipleWordsForm = ({ closeModal }) => {

  const [words, setWords] = useState('');
  const [wordsError, setWordsError] = useState(null);
  const [showValidMessage, setShowValidMessage] = useState(false);

  let wordsFieldRef = useRef(null);
  const { list } = useContext(ListsContext);
  const { showPopUp } = useContext(PopUpContext);
  const { user } = useContext(UserContext);
  const userId = user.uid;

  useEffect(() => {
    wordsFieldRef.current.focus();
  }, []);

  // return nothing if there is an error
  const validateTextAndGenerateWords = useCallback(() => {
    let wordObjects;

    try {
      wordObjects = generateWordObjectsFromString(words);
    } catch (error) {
      setWordsError('Format invalide');
      setShowValidMessage(false);
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
      setShowValidMessage(false);
      return;
    };

    if (wordObjects.length > 500) {
      setWordsError('Vous pouvez ajouter 500 mots en même temps maximum');
      setShowValidMessage(false);
      return;
    }

    setShowValidMessage(true);
    return wordObjects;
  }, [words]);

  const handleSubmit = e => {
    e.preventDefault();

    const wordObjects = validateTextAndGenerateWords();

    if (!wordObjects) return;

    addMultipleWords(wordObjects, userId, list.id).then(() => {
      closeModal();
      showPopUp('Tous les mots ont été ajoutés avec succès');
    });
  };

  useEffect(() => {
    setWordsError(null);

    if (!words) return;

    validateTextAndGenerateWords();
  }, [words, validateTextAndGenerateWords]);

  return (
    <form className='word-form' onSubmit={handleSubmit}>
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

        { wordsError &&
          <small className='invalid-message'>
            { wordsError }
          </small>
        }

        { showValidMessage &&
          <small className='valid-message'>
            Format valide
          </small>
        }

        <ul className='info'>
          <li>les tirets sont acceptés en début de ligne</li>
          <li>plusieurs séparateurs sont acceptés (:, -&#62;, =)</li>
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
