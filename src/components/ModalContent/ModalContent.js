import React from 'react';
import { useTransition, animated } from 'react-spring';

const ModalContent = ({ close, isShow, className, children }) => {

  const modalTransitions = useTransition(isShow, null, {
    from: { transform: 'translateY(-100px)' },
    enter: { transform: 'translateY(0)' },
    leave: { transform: 'translateY(-100px)' },
    config: { tension: 500, friction: 35 }
  });

  return modalTransitions.map(({ item, key, props }) =>
    item &&
    <animated.div className={`modal ${className ? className : ''}`} key={key} style={props}>
      <button onClick={close} className='close-modal'>
        <i className='close-icon material-icons-round'>close</i>
      </button>
      { children }
    </animated.div>
  );
}
 
export default ModalContent;
