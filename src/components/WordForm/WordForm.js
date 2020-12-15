import React, { useContext, useEffect, useRef, useState } from 'react';
import { PopUpContext } from '../../providers/PopUpProvider';

import { addMultipleWords, addWord, updateWord } from '../../firebase/wordMethods';

import './WordForm.css';

const WordForm = props => {

  const {
    currentWordListId, 
    userId, 
    wordToUpdate,
    closeModal 
  } = props;

  const [wordFormData, setWordFormData] = useState({
    word: wordToUpdate ? wordToUpdate.word : '',
    translation: wordToUpdate ? wordToUpdate.translation : '',
    words: '', // for multi add mode
    wordError: null, 
    translationError: null,
    wordsError: null
  });

  const [updateMode] = useState(!!wordToUpdate);
  const [importListMode, setImportListMode] = useState(false);
  let { showPopUp } = useContext(PopUpContext);
  let wordFieldRef = useRef(null);

  useEffect(() => {
    wordFieldRef.current.focus();
  }, [importListMode]);

  /**
   * creates and returns word objects from list
   * @param {string} wordList 
   * @return {object} word objects
   */
  const generateWordsFromList = wordList => {
    wordList = wordList
      .trim()
      .replace(/(\n|\r)+/g, '\n') // replaces multiple line breaks by one line break
      .split(/\n|\r/)
      .map(wordStr => {
        wordStr = wordStr.trim();

        // remove every "-" and spaces at the start of the string
        while (/-|\s/.test(wordStr[0])) wordStr = wordStr.substring(1);

        let separators = ['->', '-\\s>', '=', ':'];
        let separatorsRegexStr = separators.reduce((result, separator) => {
          return `${separator}|${result}`;
        });

        let separatorsRegex = new RegExp(separatorsRegexStr);
        let [word, translation] = wordStr.split(separatorsRegex);
        word = word.trim();
        translation = translation.trim();

        return { word, translation };
      });

    return wordList;
  };

  const validate = (word, translation) => {
    let errors = {
      empty: true,
      word: '',
      translation: ''
    };

    if (word.length > 1000) {
      errors.empty = false;
      errors.word = 'Le mot doit contenir 1000 caractères maximum';
    }
    
    if (translation.length > 1000) {
      errors.empty = false;
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
      words: '',
      wordError: null,
      translationError: null,
      wordsError: null
    });
  };

  const handleMultipleWordsSubmit = e => {
    e.preventDefault();
    let words, errors;

    try {
      words = generateWordsFromList(wordFormData.words);
    } catch (error) {
      setWordFormData({ ...wordFormData, wordsError: 'Format invalide' });
      return;
    }

    for (const { word, translation } of words) {
      errors = validate(word, translation);
      if (!errors.empty) break;
    }

    let errorMessage = 'Les mots et les traductions doivent contenir 1000 caractères maximum';

    setWordFormData({
      ...wordFormData,
      wordsError: errors.empty ? '' : errorMessage,
    });

    if (!errors.empty) return;
    addMultipleWords(words, currentWordListId, userId, () => {
      closeModal();
      showPopUp('Tous les mots ont été ajoutés avec succès');
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

    if (!errors.empty) return;

    if (updateMode) {
      updateWord({ word, translation }, currentWordListId, userId, wordToUpdate.id, () => {
        closeModal();
        showPopUp('Le mot a bien été mis à jour');
      });
    } else {
      addWord({ word, translation }, currentWordListId, userId, () => {
        clear();
        wordFieldRef.current.focus();
        showPopUp('Le mot a bien été ajouté');
      });
    }
  };

  return (
    <>
      <form 
        className='word-form'
        onSubmit={ importListMode ? handleMultipleWordsSubmit : handleSubmit } 
      >
        { importListMode && !updateMode ? (
          <div className='list-field'>
            <label htmlFor='multi-words'>Coller votre liste de mots (1 mot par ligne)</label>
            <textarea
              ref={wordFieldRef}
              className='form-elt'
              name='words' 
              id='multi-words'
              required
              value={wordFormData.words}
              onChange={handleChange}
              placeholder='mot en anglais : traduction(s)'
            ></textarea>
            <small className={ wordFormData.wordsError ? 'invalid-message' : '' }>
              { wordFormData.wordsError && wordFormData.wordsError }
            </small>
            <ul className='info'>
              <li>les tirets sont acceptés en début de ligne</li>
              <li>plusieurs séparateurs sont acceptés (:, -&#62;, =)</li>
              <li>Un seul séparateur par ligne</li>
            </ul>
          </div>
        ) : (
          <>
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
          </>
        ) }
        <div className='actions'>
          { !updateMode && !importListMode &&
            <button 
              className='import-list bg-transparent text-primary'
              onClick={() => setImportListMode(!importListMode)} 
              type='button'
            >
              <span className='material-icons-round'>system_update_alt</span>
              Importer
            </button>
          }
          <button className='btn btn-text-primary' onClick={closeModal} type='button'>
            Annuler
          </button>
          <button className='btn btn-primary' type='submit'>
            { updateMode ? 'Modifier' : 'Ajouter' }
          </button>
        </div>
      </form>
    </>
  );
}

export default WordForm;
