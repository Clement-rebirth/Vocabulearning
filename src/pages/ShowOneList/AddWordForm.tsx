import { useEffect, useRef, useState } from 'react';
import { addWord } from '../../utils/firebase/wordMethods';
import { validateWord } from '../../utils/words/validateWord';
import { useLists } from '../../contexts/ListsContext';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';
import { FormErrors } from '../../types/error';
import { WordFormData } from '../../types/word';

interface AddWordFormProps {
  setAddMultipleWordsMode: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
}

const AddWordForm = ({ setAddMultipleWordsMode, closeModal }: AddWordFormProps) => {

  const DEFAULT_FORM_DATA = {
    word: '',
    translation: '',
  };

  const [wordFormData, setWordFormData] = useState<WordFormData>(DEFAULT_FORM_DATA);
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

  const clear = () => setWordFormData(DEFAULT_FORM_DATA);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!list || !userId) return;

    let { word, translation } = wordFormData;
    const errors = validateWord({ word, translation });
    setFormErrors(errors);

    let isErrorsEmpty = Object.keys(errors).length === 0;
    if (!isErrorsEmpty) return;

    addWord({ word, translation }, list.id, userId)
      .then(() => {
        clear();
        if (wordFieldRef.current) {
          wordFieldRef.current.focus();
        }
        closeModal();
        toast.success('Le mot a bien été ajouté');
      })
      .catch(error => toast.error('Une erreur inconnue est survenue'));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target;
    setWordFormData({ ...wordFormData, [name]: value });
  };

  return (
    <form
      className='word-form'
      onSubmit={handleSubmit}
    >
      <div className='word-field'>
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
        <input
          id='translation'
          className={`bd-bottom-only ${formErrors.translation && 'invalid'}`}
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
        <button
          className='btn btn-text-primary import-list'
          onClick={() => setAddMultipleWordsMode(true)}
          type='button'
        >
          <span className='material-symbols-rounded'>system_update_alt</span>
          Importer
        </button>

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

export default AddWordForm;
