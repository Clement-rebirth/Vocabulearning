import React from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Login from '../Login/Login';
import Register from '../Register/Register';

import './Home.css';

const Home = () => {
    
  let history = useHistory();
  
  const handleCloseLogin = () => history.push('/');
  const handleCloseRegister = () => history.push('/');

  return (
    <div className='home'>
      <div className='get-started'>
        <h1>Vocabu<br />Learning</h1>
        <p>Apprendre du vocabulaire n'a jamais été aussi simple</p>
        <div className='auth'>
          <Link className='btn register' to='/register'>S'inscrire</Link>
          <p className='login'>
            Déjà inscrit ? <Link to='/login'>Se connecter</Link>
          </p>
        </div>
      </div>

      <Route path='/login'>
        <Modal visible={true} handleClose={handleCloseLogin}>
          <Login />
        </Modal>
      </Route>

      <Route path='/register'>
        <Modal visible={true} handleClose={handleCloseRegister}>
          <Register />
        </Modal>
      </Route>
    </div>
  );
}

export default Home;
