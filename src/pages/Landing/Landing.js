import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { ROUTES } from '../../constants';

import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import Login from './Login/Login';
import Register from './Register/Register';

import './Landing.css';

const Home = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let { user, setUser } = useContext(UserContext);
  let { pathname } = useLocation();
  let history = useHistory();

  useEffect(() => {
    setShowLogin(pathname === ROUTES.SIGN_IN);
    setShowRegister(pathname === ROUTES.SIGN_UP);
  }, [pathname]);

  if (user) return <Redirect to={ROUTES.HOME} />;

  return (
    <>
      <div className='landing'>
        <div className='get-started'>
          <h1>Vocabu<br />Learning</h1>
          <p>Apprendre du vocabulaire n'a jamais été aussi simple</p>
          <div className='auth'>
            <Link className='register' to={ROUTES.SIGN_UP}>S'inscrire</Link>
            <p className='login'>
              <span>Déjà inscrit ? </span>
              <Link to={ROUTES.SIGN_IN}>Se connecter</Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        className='auth-modal'
        isShow={showLogin} 
        close={() => history.replace(ROUTES.LANDING)}
      >
        <Login setUser={setUser} />
      </Modal>

      <Modal
        className='auth-modal'
        isShow={showRegister} 
        close={() => history.replace(ROUTES.LANDING)}
      >
        <Register setUser={setUser} />
      </Modal>
    </>
  );
}

export default Home;
