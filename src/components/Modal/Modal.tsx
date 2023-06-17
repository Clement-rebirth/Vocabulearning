import { useEffect } from 'react';

import { Overlay } from '../Overlay/Overlay';
import ModalContent from './ModalContent';

import './Modal.css';

interface ModalProps {
  isShow: boolean;
  close: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal = ({ isShow, close, className, children }: ModalProps) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (isShow) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    }
  }, [isShow, close]);

  return (
    <Overlay isShow={isShow} close={close} className='modal-overlay'>
      <ModalContent close={close} isShow={isShow} className={className}>
        { children }
      </ModalContent>
    </Overlay>
  );
}

export default Modal;
