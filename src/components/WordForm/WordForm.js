import React from 'react';

import './WordForm.css';

const WordForm = () => {
  return (
    <>
      <form className='word-form'>
        <label>
          Votre mot :
          <input type='text' />
        </label>
        <label>
          Traduction(s) du mot :
          <input type='text' />
        </label>
        <button type='submit'>Ajouter</button>
      </form>
    </>
  );
}

export default WordForm;
