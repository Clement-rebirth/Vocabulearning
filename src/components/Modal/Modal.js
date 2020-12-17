import React, { useCallback, useEffect } from 'react';

import Overlay from '../Overlay/Overlay';
import ModalContent from './ModalContent';

import './Modal.css';

const Modal = ({ isShow, close, className, children }) => {

  const handleKeydown = useCallback(event => {
    if (event.key === 'Escape') close();
  }, [close]);

  useEffect(() => {
    if (!isShow) return;
    
    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isShow, handleKeydown]);

  return (
    <Overlay isShow={isShow} onClick={close} className='modal-overlay'>
      <ModalContent close={close} isShow={isShow} className={className}>
        { children }
      </ModalContent>
    </Overlay>
  );
}

export default Modal;
