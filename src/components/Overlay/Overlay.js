import { useEffect, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

import './Overlay.css';

const Overlay = ({ isShow, close, className, children }) => {
  const [shouldCloseModal, setShouldCloseModal] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : 'visible';
  }, [isShow]);

  const handleMouseUp = e => {
    const clickIsOnOverlay = e.target === e.currentTarget;

    if (shouldCloseModal && clickIsOnOverlay) {
      close();
    }

    setShouldCloseModal(true);
  };

  const handleMouseDown = e => {
    // if we click on the modal, not the overlay
    if (e.currentTarget !== e.target) {
      setShouldCloseModal(false);
    }
  };

  const overlayTransitions = useTransition(isShow, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 360, friction: 42 }
  });

  return overlayTransitions((style, item) => item && (
    <animated.div
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      className={`overlay custom-scrollbar ${className ? className : ''}`}
      style={style}
    >
      {children}
    </animated.div>
  ));
}

export default Overlay;
