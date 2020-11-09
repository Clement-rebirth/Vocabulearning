import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

import './Home.css';

const Home = () => {

  return (
    <div className='home'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <div className='get-started'>
              <h1>Vocabu<br />Learning</h1>
              <p>Apprendre du vocabulaire n'a jamais été aussi simple</p>
              <div className='auth'>
                <Link className='btn register' to='/register'>S'inscrire</Link>
                <p className='login'>Déjà inscrit ? <Link to='/login'>Se connecter</Link></p>
              </div>
            </div>
          </Route>
          <Route path='/login'><Login /></Route>
          <Route path='/register'><Register /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Home;
