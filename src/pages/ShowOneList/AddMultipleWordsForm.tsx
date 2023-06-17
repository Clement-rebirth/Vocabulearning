import { useCallback, useEffect, useRef, useState } from 'react';
import { addMultipleWords } from '../../utils/firebase/wordMethods';
import { generateWordObjectsFromString } from '../../utils/words/generateWordObjectsFromString';
import { validateWord } from '../../utils/words/validateWord';
import { useLists } from '../../contexts/ListsContext';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';

interface AddMultipleWordsFormProps {
  closeModal: () => void;
}

const AddMultipleWordsForm = ({ closeModal }: AddMultipleWordsFormProps) => {

  const [words, setWords] = useState('');
  const [wordsError, setWordsError] = useState<string | null>(null);
  const [showValidMessage, setShowValidMessage] = useState(false);

  let wordsFieldRef = useRef<HTMLTextAreaElement | null>(null);
  const { list } = useLists();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (wordsFieldRef.current) {
      wordsFieldRef.current.focus();
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !list) return;

    const wordObjects = validateTextAndGenerateWords();

    if (!wordObjects) return;

    addMultipleWords(wordObjects, userId, list.id)
      .then(() => {
        closeModal();
        toast.success('Tous les mots ont été ajoutés avec succès');
      })
      .catch(error => toast.error('Une erreur inconnue est survenue'));
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
