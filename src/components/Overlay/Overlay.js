import React, { useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';

import './Overlay.css';

const Overlay = props => {

  const {
    isShow,
    onClick,
    className,
    animationConfig = { tension: 360, friction: 42 },
    children,
  } = props;

  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : 'visible';
  }, [isShow]);

  const handleOverlayClick = e => {
    // to execute only when we click on the overlay, not its content
    if (e.currentTarget === e.target) onClick();
  }

  const overlayTransitions = useTransition(isShow, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: animationConfig
  });

  return overlayTransitions((style, item) => item && (
    <animated.div
      onClick={handleOverlayClick}
      className={`overlay custom-scrollbar ${className ? className : ''}`}
      style={style}
    >
      {children}
    </animated.div>
  ));
}

export default Overlay;
