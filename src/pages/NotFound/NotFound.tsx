import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

import { NothingToShow } from '../../components/NothingToShow/NothingToShow';

import pageNotFoundImg from '../../assets/img/illustrations/undraw-page-not-found-yellow.svg';

import './NotFound.css';

export const NotFound = () => (
  <NothingToShow
    message={`La page recherchée n'existe pas`}
    src={pageNotFoundImg}
    alt='404 page not found illustration'
    className='page-not-found'
  >
    <Link className='btn btn-outline-primary go-home' to={ROUTES.LANDING}>Page d&apos;accueil</Link>
  </NothingToShow>
);
