import { useEffect, useRef, useState } from 'react';
import { updateWord } from '../../utils/firebase/wordMethods';
import { validateWord } from '../../utils/words/validateWord';
import { useLists } from '../../contexts/ListsContext';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';
import { WordFormData, WordWithId } from '../../types/word';
import { FormErrors } from '../../types/error';

interface UpdateWordFormProps {
  wordToUpdate: WordWithId;
  closeModal: () => void;
}

const UpdateWordForm = ({ wordToUpdate, closeModal }: UpdateWordFormProps) => {

  const [wordFormData, setWordFormData] = useState<WordFormData>({
    word: wordToUpdate.word,
    translation: wordToUpdate.translation,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  let wordFieldRef = useRef<HTMLInputElement | null>(null);
  const { list } = useLists();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (wordFieldRef.current) {
      wordFieldRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target;
    setWordFormData({ ...wordFormData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!list || ! userId) return;

    let { word, translation } = wordFormData;
    const errors = validateWord({ word, translation });
    setFormErrors(errors);

    let isErrorsEmpty = Object.keys(errors).length === 0;

    if (!isErrorsEmpty) return;

    updateWord({ word, translation }, userId, list.id, wordToUpdate.id)
      .then(() => {
        closeModal();
        toast.success('Le mot a bien été mis à jour');
      })
      .catch(error => toast.error('Une erreur inconnue est survenue'));
  };

  return (
    <form
      className='word-form'
      onSubmit={handleSubmit}
    >
      <div className='word-field'>
        {/* <label htmlFor='word'>Votre mot :</label> */}
        <input
          ref={wordFieldRef}
          id='word'
          className={`bd-bottom-only ${formErrors.word ? 'invalid' : ''}`}
          type='text'
          required
          placeholder='En anglais'
          name='word'
          value={wordFormData.word}
          onChange={handleChange}
          autoComplete='off'
        />
        {formErrors.word && (
          <small className='invalid-message'>{ formErrors.word }</small>
        )}
      </div>
      <div className='translation-field'>
        {/* <label htmlFor='translation'>Traduction(s) du mot :</label> */}
        <input
          id='translation'
          className={`bd-bottom-only ${formErrors.translation ? 'invalid' : ''}`}
          type='text'
          required
          placeholder='En français'
          name='translation'
          value={wordFormData.translation}
          onChange={handleChange}
          autoComplete='off'
        />
        {formErrors.translation && (
          <small className='invalid-message'>{ formErrors.translation }</small>
        )}
      </div>

      <div className='actions'>
        <button className='btn btn-text-primary' onClick={closeModal} type='button'>
          Annuler
        </button>
        <button className='btn btn-primary' type='submit'>
          Modifier
        </button>
      </div>
    </form>
  );
}

export default UpdateWordForm;
