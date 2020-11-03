import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Welcome = () => {

  const [loginIsShow, setLoginIsShow] = useState(false);
  const [registerIsShow, setRegisterIsShow] = useState(false);
  
  const showLogin = () => {
    setLoginIsShow(true);
    setRegisterIsShow(false);
  }

  const showRegister = () => {
    setLoginIsShow(false);
    setRegisterIsShow(true);
  }

  return (
    <>
      <h1>VocabuLearning</h1>
      <p>Apprendre du vocabulaire n'a jamais été aussi simple</p>
      <button onClick={showRegister}>S'inscrire</button>
      <button onClick={showLogin}>Se connecter</button>

      { loginIsShow ? <Login /> : null }
      { registerIsShow ? <Register /> : null }
    </>
  );
}

export default Welcome;
