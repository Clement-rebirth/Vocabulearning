import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import Register from '../Register/Register';

import { ROUTES } from '../../constants';

import './Landing.css';

const Home = () => {
    
  let history = useHistory();
  
  const handleCloseLogin = () => history.push(ROUTES.LANDING);
  const handleCloseRegister = () => history.push(ROUTES.LANDING);

  return (
    <div className='landing'>
      <div className='get-started'>
        <h1>Vocabu<br />Learning</h1>
        <p>Apprendre du vocabulaire n'a jamais été aussi simple</p>
        <div className='auth'>
          <Link className='btn register' to={ROUTES.SIGN_UP}>S'inscrire</Link>
          <p className='login'>
            Déjà inscrit ? <Link to={ROUTES.SIGN_IN}>Se connecter</Link>
          </p>
        </div>
      </div>

      <Route path={ROUTES.SIGN_IN}>
        <Modal visible={true} handleClose={handleCloseLogin}>
          <Login />
        </Modal>
      </Route>

      <Route path={ROUTES.SIGN_UP}>
        <Modal visible={true} handleClose={handleCloseRegister}>
          <Register />
        </Modal>
      </Route>
    </div>
  );
}

export default Home;
