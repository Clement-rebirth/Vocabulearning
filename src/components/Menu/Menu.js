import React from 'react';
import { useHistory } from 'react-router-dom';
import firebaseApp from '../../firebase';

const Menu = ({ isShow, handleClose }) => {

  let history = useHistory();

  const logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        history.replace('/');
      }).catch(error => {
        console.log('logout error : ', error);
      });
  };

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
              <li><span onClick={logout}>Se déconnecter</span></li>
            </ul>
          </nav>
        </aside>
      </>
    );
  }

  return menu;
}

export default Menu;
