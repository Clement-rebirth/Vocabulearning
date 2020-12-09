import React, { useEffect } from 'react';

import './Menu.css';

const Menu = ({ isShow, handleClose, handleSignOut }) => {

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) handleClose();
  };

  useEffect(() => {
    let newValue = isShow ? 'hidden' : 'visible';
    document.body.style.overflow = newValue;
  }, [isShow]);

  let menu = null;

  if (isShow) {
    menu = (
      <>
        <div onClick={handleOverlayClick} id='menu-overlay'></div>
        <aside className='menu'>
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
        </aside>
      </>
    );
  }

  return menu;
}

export default Menu;
