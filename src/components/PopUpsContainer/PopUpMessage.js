import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

const PopUpMessage = ({ status, message, close, timeout = 3000 }) => {

  const [isShow, setIsShow] = useState(true);

  let statusIcon = '';

  switch (status) {
    case 'success':
      statusIcon = 'check_circle';
      break;
    case 'error':
      statusIcon = 'error';
      break;
    default:
      throw new Error('Invalid status prop value');
  }

  const popUpTransitions = useTransition(isShow, {
    from: { opacity: 0, transform: 'scaleY(0)' },
    enter: { opacity: 1, transform: 'scaleY(1)' },
    leave: { opacity: 0, transform: 'scaleY(0)' },
    onRest: () => setTimeout(() => setIsShow(false), timeout),
    onDestroyed: close,
    config: { tension: 360, friction: 50 }
  });

  return popUpTransitions((style, item) => item && (
    <animated.div className={`pop-up-message ${status}`} style={style}>
      <span className='material-symbols-rounded outline status'>{ statusIcon }</span>
      <p>{ message }</p>
      <button onClick={() => setIsShow(false)} className='close-pop-up' aria-label='Fermer le message'>
        <span className='material-symbols-rounded'>close</span>
      </button>
    </animated.div>
  ));
}

export default PopUpMessage;
