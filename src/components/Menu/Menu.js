import React from 'react';

const Menu = ({ isShow, handleClose, handleSignOut }) => {

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) handleClose();
  };

  let menu = null;

  if (isShow) {
    menu = (
      <>
        <div onClick={handleOverlayClick} id='menu-overlay' className='overlay'></div>
        <aside className='menu'>
          <button onClick={handleClose}>Fermer</button>
          <nav>
            <ul>
              <li><span onClick={handleSignOut}>Se déconnecter</span></li>
            </ul>
          </nav>
        </aside>
      </>
    );
  }

  return menu;
}

export default Menu;
