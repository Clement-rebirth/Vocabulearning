import React from 'react';

import './AddWord.css';

const AddWord = () => {
  return (
    <>
      <form className='add-word-form'>
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
  )
}

export default AddWord;
