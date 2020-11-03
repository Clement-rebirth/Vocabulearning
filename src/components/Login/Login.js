import React, { useState } from 'react';

const Login = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { value, name } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  }

  const handleLogin = e => {
    e.preventDefault();
  }

  return (
    <>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email :
          <input
            required
            value={loginFormData.email}
            name='email'
            type='email'
            onChange={handleChange} />
        </label>
        <label>
          Mot de passe :
          <input
            required
            value={loginFormData.password}
            name='password'
            type='password'
            onChange={handleChange} />
        </label>
        <button>S'inscrire</button>
      </form>

      <button>Se connecter avec google</button>
    </>
  )
}

export default Login;
