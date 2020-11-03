import React from 'react';

import './Modal.css';

const Modal = ({visible, handleClose, children}) => {

  // add focus on the modal when open

  const handleCloseModal = e => {
    // to close only when we click on the overlay, not the modal itself
    if (e.currentTarget === e.target) handleClose();
  }

  let modal = null;

  if (visible) {
    modal = (
      <div onClick={e => {handleCloseModal(e)}} className='modal-overlay'>
        <div className='modal'>
          <button onClick={handleClose} className="close-modal">X</button>
          { children }
        </div>
      </div>
    );
  }

  return modal;
}

export default Modal;
