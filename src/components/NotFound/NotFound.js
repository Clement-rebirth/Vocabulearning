import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';

const NotFound = () => (
  <>
    <h1>La page recherchée n'existe pas</h1>
    <Link to={ROUTES.LANDING}>Accueil</Link>
  </>
);

export default NotFound;
