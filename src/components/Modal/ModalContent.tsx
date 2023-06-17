import { useTransition, animated } from '@react-spring/web';

interface ModalContentProps {
  close: () => void;
  isShow: boolean;
  className?: string;
  children: React.ReactNode;
}

const ModalContent = ({ close, isShow, className, children }: ModalContentProps) => {

  const modalTransitions = useTransition(isShow, {
    from: { transform: 'translateY(-100px)' },
    enter: { transform: 'translateY(0px)' },
    leave: { transform: 'translateY(-100px)' },
    config: { tension: 500, friction: 35 }
  });

  return modalTransitions((style, item) => item && (
    <animated.div className={`modal ${className ? className : ''}`} style={style}>
      <button onClick={close} className='close-modal'>
        <i className='close-icon material-symbols-rounded'>close</i>
      </button>
      { children }
    </animated.div>
  ));
}

export default ModalContent;
