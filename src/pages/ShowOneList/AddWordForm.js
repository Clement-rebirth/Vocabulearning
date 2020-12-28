import React, { useEffect, useRef, useState } from 'react';
import { addWord } from '../../services/firebase/wordMethods';
import { validateWord } from '../../services/words/validateWord';

const AddWordForm = ({ currentWordListId, userId, setAddMultipleWordsMode, closeModal, showPopUp }) => {

  const DEFAULT_FORM_DATA = {
    word: '',
    translation: '',
    wordError: null, 
    translationError: null,
  };

  const [wordFormData, setWordFormData] = useState(DEFAULT_FORM_DATA);

  let wordFieldRef = useRef(null);

  useEffect(() => {
    wordFieldRef.current.focus();
  }, []);

  const clear = () => setWordFormData(DEFAULT_FORM_DATA);

  const handleSubmit = e => {
    e.preventDefault();

    let { word, translation } = wordFormData;
    const errors = validateWord({ word, translation });
    
    setWordFormData({
      ...wordFormData,
      wordError: errors.word ? errors.word : null,
      translationError: errors.translation ? errors.translation : null
    });
    
    let isErrorsEmpty = Object.keys(errors).length === 0;
    
    if (!isErrorsEmpty) return;

    addWord({ word, translation }, currentWordListId, userId, () => {
      clear();
      wordFieldRef.current.focus();
      showPopUp('Le mot a bien été ajouté');
    });
  };

  const handleChange = e => {
    let { value, name } = e.target;
    setWordFormData({ ...wordFormData, [name]: value });
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
        <button 
          className='import-list bg-transparent text-primary'
          onClick={() => setAddMultipleWordsMode(true)} 
          type='button'
        >
          <span className='material-icons-round'>system_update_alt</span>
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
