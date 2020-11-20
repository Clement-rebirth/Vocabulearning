import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { ROUTES } from '../../constants';

const NotFound = () => {

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    // if we're not on the /NOT_FOUND url
    if (location.pathname.indexOf(ROUTES.NOT_FOUND) !== 0) {
      history.replace(ROUTES.NOT_FOUND + location.pathname);
    }
  }, [location.pathname, history]);

  return (
    <>
      <h1>La page recherchée n'existe pas</h1>
      <Link to={ROUTES.LANDING}>Accueil</Link>
    </>
  );
}

export default NotFound;
