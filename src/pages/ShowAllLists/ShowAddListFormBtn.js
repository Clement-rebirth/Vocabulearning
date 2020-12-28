import React from 'react';

const ShowAddListFormBtn = ({ addFormIsShow, openAddForm }) => (
  <button 
    className={`add-list-btn ${addFormIsShow ? 'd-none' : ''}`} 
    onClick={openAddForm}
  >
    <span className='material-icons-round'>add</span> 
    Ajouter une liste
  </button>
);
 
export default ShowAddListFormBtn;
