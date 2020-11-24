import React, { useState } from 'react';

import './WordForm.css';

const WordForm = props => {

  const { 
    addWord,
    updateWord, 
    wordListId, 
    userId, 
    wordToUpdate,
    closeModal } = props;

  const [wordFormData, setWordFormData] = useState({
    word: wordToUpdate ? wordToUpdate.word : '',
    translation: wordToUpdate ? wordToUpdate.translation : '',
    wordError: null,
    translationError: null
  });

  const [updateMode] = useState(!!wordToUpdate);

  const validate = (word, translation) => {
    let errors = {
      emtpy: true,
      word: '',
      translation: ''
    };

    if (word.length > 1000) {
      errors.emtpy = false;
      errors.word = 'Le mot doit contenir 1000 caractères maximum';
    }
    
    if (translation.length > 1000) {
      errors.emtpy = false;
      errors.translation = 'La traduction doit contenir 1000 caractères maximum';
    }

    return errors;
  };

  const handleChange = e => {
    let { value, name } = e.target;
    setWordFormData({ ...wordFormData, [name]: value });
  };

  const clear = () => {
    setWordFormData({
      word: '',
      translation: '',
      wordError: null,
      translationError: null
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    let { word, translation } = wordFormData;
    const errors = validate(word, translation);

    setWordFormData({
      ...wordFormData,
      wordError: errors.word,
      translationError: errors.translation
    });

    if (!errors.emtpy) return;

    if (updateMode) {
      updateWord({ word, translation }, wordListId, userId, wordToUpdate.id);
      closeModal();
    } else {
      addWord({ word, translation }, wordListId, userId);
      clear()
    }
  };

  return (
    <>
      <form className='word-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='word'>Votre mot :</label>
          <input
            id='word'
            className={wordFormData.wordError && 'invalid'}
            type='text'
            required
            placeholder='En anglais'
            name='word'
            value={wordFormData.word}
            onChange={handleChange} 
          />
          <small className='invalid-message'>{ wordFormData.wordError }</small>
        </div>
        <div>
          <label htmlFor='translation'>Traduction(s) du mot :</label>
          <input
            id='translation'
            className={wordFormData.translationError && 'invalid'}
            type='text'
            required
            placeholder='En français'
            name='translation'
            value={wordFormData.translation}
            onChange={handleChange} 
          />
          <small className='invalid-message'>{ wordFormData.translationError }</small>
        </div>
        <button type='submit'>{ updateMode ? 'Modifier' : 'Ajouter' }</button>
      </form>
    </>
  );
}

export default WordForm;
