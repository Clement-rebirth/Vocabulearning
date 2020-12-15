import React, { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';

import './Menu.css';

const Menu = ({ isShow, handleClose, handleSignOut }) => {

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) handleClose();
  };
  
  useEffect(() => {
    document.body.style.overflow = isShow ? 'hidden' : 'visible';
  }, [isShow]);

  const config = { tension: 360, friction: 42 };

  const overlayTransitions = useTransition(isShow, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config
  });

  const menuTransitions = useTransition(isShow, null, {
    from: { transform: 'translateX(-100%)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-100%)' },
    config: config
  });

  return (
    <>
      {
        overlayTransitions.map(({ item, key, props }) =>
          item && 
          <animated.div
            key={key}
            style={props}
            onClick={handleOverlayClick}
            id='menu-overlay'
          />
        )
      }

      {
        menuTransitions.map(({ item, key, props }) =>
          item && 
          <animated.aside
            key={key}
            style={props}
            className='menu'
          >
            <div className='top'>
              <button className='close-menu' onClick={handleClose}>
                <span className='material-icons-round'>close</span>
              </button>
              <h1><span>VocabuLearning</span></h1>
            </div>
            <nav>
              <ul>
                <li tabIndex='0' className='sign-out' onClick={handleSignOut}>
                  <span className='material-icons-round'>exit_to_app</span>
                  Se déconnecter
                </li>
              </ul>
            </nav>
          </animated.aside>
        )
      }
    </>
  );
}

export default Menu;
