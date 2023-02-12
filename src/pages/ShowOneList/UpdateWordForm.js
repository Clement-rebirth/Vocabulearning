import { useContext, useEffect, useRef, useState } from 'react';
import { updateWord } from '../../utils/firebase/wordMethods';
import { validateWord } from '../../utils/words/validateWord';
import { UserContext } from '../../providers/UserProvider';
import { PopUpContext } from '../../providers/PopUpProvider';
import { ListsContext } from '../../providers/ListsProvider';

const UpdateWordForm = ({ wordToUpdate, closeModal }) => {

  const [wordFormData, setWordFormData] = useState({
    word: wordToUpdate.word,
    translation: wordToUpdate.translation,
    wordError: null,
    translationError: null,
  });

  let wordFieldRef = useRef(null);
  const { list } = useContext(ListsContext);
  const { showPopUp } = useContext(PopUpContext);
  const { user } = useContext(UserContext);
  const userId = user.uid;

  useEffect(() => {
    wordFieldRef.current.focus();
  }, []);

  const handleChange = e => {
    let { value, name } = e.target;
    setWordFormData({ ...wordFormData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let { word, translation } = wordFormData;
    const errors = validateWord({ word, translation });

    setWordFormData({
      ...wordFormData,
      wordError: errors.word,
      translationError: errors.translation
    });

    let isErrorsEmpty = Object.keys(errors).length === 0;

    if (!isErrorsEmpty) return;

    updateWord({ word, translation }, list.id, userId, wordToUpdate.id).then(() => {
      closeModal();
      showPopUp('Le mot a bien été mis à jour');
    });
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
          className={`bd-bottom-only ${wordFormData.wordError && 'invalid'}`}
          type='text'
          required
          placeholder='En anglais'
          name='word'
          value={wordFormData.word}
          onChange={handleChange}
          autoComplete='off'
        />
        <small className='invalid-message'>{ wordFormData.wordError }</small>
      </div>
      <div className='translation-field'>
        {/* <label htmlFor='translation'>Traduction(s) du mot :</label> */}
        <input
          id='translation'
          className={`bd-bottom-only ${wordFormData.translationError && 'invalid'}`}
          type='text'
          required
          placeholder='En français'
          name='translation'
          value={wordFormData.translation}
          onChange={handleChange}
          autoComplete='off'
        />
        <small className='invalid-message'>{ wordFormData.translationError }</small>
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
